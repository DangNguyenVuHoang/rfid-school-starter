// functions/index.js
import { onValueCreated } from 'firebase-functions/v2/database';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Đặt ref, region và instance cho đúng RTDB của bạn
export const processRfidLog = onValueCreated(
  {
    ref: '/rfid_logs/{logId}',
    region: 'asia-southeast1',                // gần VN, match với region DB
    instance: 'rfid-school-demo-default-rtdb' // tên instance, KHÔNG kèm https://
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const log = snap.val();
    const rfid = log?.rfid;
    const ts = Number(log?.ts || Date.now());
    if (!rfid) return;

    const db = admin.database();

    // Tìm user theo rfid
    const usersRef = db.ref('users');
    const q = usersRef.orderByChild('rfid').equalTo(String(rfid)).limitToFirst(1);
    const usersSnap = await q.get();
    if (!usersSnap.exists()) {
      console.warn('No user for RFID:', rfid);
      return;
    }
    const [uid] = Object.keys(usersSnap.val());

    // Cập nhật lastSeen
    await db.ref(`users/${uid}/lastSeen`).set(ts);

    // Ghi checkin theo ngày YYYY-MM-DD
    const day = new Date(ts).toISOString().slice(0,10);
    const checkinRef = db.ref(`checkins/${day}/${uid}`);
    const checkSnap = await checkinRef.get();
    if (!checkSnap.exists() || checkSnap.val().in == null) {
      await checkinRef.update({ in: ts });
    } else if (checkSnap.val().out == null) {
      await checkinRef.update({ out: ts });
    } else {
      await db.ref(`checkins/${day}/${uid}/extra`).push({ ts });
    }
  }
);
