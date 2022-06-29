import { db } from "../../../firebase";
import { ref, set } from 'firebase/database';

const createUserAPI = (user) => {
    const value = {
        fullName: '',
        phoneNumber: '',
        avatarImg: '',
        sex: null,
        birthday: '',
        type: user.type,
    }
    //dùng set() thì key sẽ là key do mình tự chọn, ở đây lấy uid của user bên authentication làm key
    //còn đối với các bảng khác thì muốn tạo key tự động dùng hàm push()
    set(ref(db, 'user/' + user.id), value)
};

export default createUserAPI;