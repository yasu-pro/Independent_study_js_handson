var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var registerTextElem = document.querySelector('.registerText');
var closeBtn = document.querySelector('.closeBtn');
var modalContentsElem = document.querySelector('.modal_contents');
var registerCheckBox = document.getElementById('register');
var validState = {
    password: false,
};
var passwordInputElem = document.querySelector('input[name="password"]');
passwordInputElem.addEventListener('keyup', function () {
    var passwordValue = passwordInputElem.value;
    var invalidElem = document.querySelector('.invalidError.password');
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(passwordValue)) {
        invalidElem.style.display = 'block';
        validState.password = false;
    }
    else {
        invalidElem.style.display = 'none';
        validState.password = true;
    }
    toggleSubmit();
});
var toggleSubmit = function () {
    var submitBtn = document.querySelector('js-submitBtn');
    var allValid = Object.values(validState).every(function (validValue) { return validValue === true; });
    submitBtn.disabled = !allValid;
};
var usersHandler = function () { return __awaiter(_this, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch('https://6802e9880a99cb7408eab082.mockapi.io/api/v1/users')];
            case 1:
                users = _a.sent();
                console.log('users', users);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
usersHandler();
// // server内の仮想処理をフロントから呼ぶ
// const usersHandler = async (value: {id: string, email: string} | string) => {
//     // try-catchは省略
//     const users = await fetch("/hoge") // 1. fetchUsers。APIで実装されたものに置き換える
//     if(users.length === 0){
//     return {
//         ok: true,
//         code: 200,
//         message: "empty",
//         token: null
//       }
//     }
//     // 2. ここでusersByIdsをArray.reduceで作る。Array.findでもよい。以下はreduceで作った場合
//     const user = usersByIds[value] // 3. 存在するかチェック。「ご自身の情報」がAPIに入っていれば見つかるはず
//     if(user){
//       return {
//         ok: true,
//         code: 200,
//         token: // 4. user.userIdを利用して割り当てる
//       }
//     }
//     return {
//       ok: false,
//       code: 401,
//       message: "Not found"
//     }
//   }
