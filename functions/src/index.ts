import {functions, db} from "./plugins/firebase";

// 平日9時に保存モードを開始する
export const startSaveModeCron = functions.pubsub.schedule("0 9 * * 1-5")
    .timeZone("Asia/Tokyo")
    .onRun(async () => {
      const batch = db.batch();

      const col = db.collection("devices");
      const idList = [
        "0881269a1ac6746f", // エレベーター左
        "6e90dd68ec031ce1", // エレベーター右
        "4f3b8bb564a3203c", // 9F
      ];
      idList.forEach((id) => {
        const ref = col.doc(id);
        batch.set(ref, {isSave: true}, {merge: true});
      });

      await batch.commit();
    });

// 平日18時に保存モードを終了する
export const stopSaveModeCron = functions.pubsub.schedule("0 18 * * 1-5")
    .timeZone("Asia/Tokyo")
    .onRun(async () => {
      const batch = db.batch();

      const col = db.collection("devices");
      const snapshots = await col.get();
      snapshots.docs.map((doc) => {
        batch.set(doc.ref, {isSave: false}, {merge: true});
      });

      await batch.commit();
    });
