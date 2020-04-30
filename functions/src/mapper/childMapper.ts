import {IMapper} from "../interfaces/mapper";
import {Child} from "../models/child";
import Timestamp = FirebaseFirestore.Timestamp;

export class ChildMapper implements IMapper<Child> {
  fromSnapshot(snapshot: FirebaseFirestore.DocumentSnapshot): Child | undefined {
    if (snapshot === null || snapshot === undefined) return undefined;
    const data = snapshot.data();
    if (data === null || data === undefined) return undefined;

    return new Child(snapshot.ref, data[Child.NAME_FIELD], data[Child.DOB_FIELD]?.toDate());
  }

  toMap(item: Child): FirebaseFirestore.DocumentData {
    return {
      [Child.NAME_FIELD]: item.name,
      [Child.DOB_FIELD]: item.dob ? Timestamp.fromDate(item.dob) : null,
    };
  }

}
