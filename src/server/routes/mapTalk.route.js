import express from 'express';
import validate from 'express-validation';

import mapTalkCtrl from '../controllers/maptalk.controller';
import paramValidation from '../../config/param-validation';

const router = express.Router();

router.route('/')
  .get(mapTalkCtrl.dataGet) /** 取得 mapTalk 所有值組 */
  .post(validate(paramValidation.createmapTalk), mapTalkCtrl.dataPost); /** 新增 mapTalk 值組 */

router.route('/:mapTalk_id')
  .put(mapTalkCtrl.dataPut) /** 修改 mapTalk 值組 */
  .delete(mapTalkCtrl.dataDelete); /** 刪除 mapTalk 值組 */

/** 利用 Middleware 取得 Header 中的 Bearer Token */
const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' '); // 字串切割
    const bearerToken = bearer[1]; // 取得JWT
    req.token = bearerToken; // 在 response 中建立一個 token 參數
    next(); // 結束 Middleware 進入 mapTalkCtrl.dataPersonalGet
  } else {
    res.status(403).send(Object.assign(
      { code: 403 },
      { message: '您尚未登入!' }
    )); // Header 查無 Bearer Token
  }
};

/** 取得某用戶的 mapTalk 所有值組 */
router.get('/personal', ensureToken, mapTalkCtrl.dataPersonalGet);

export default router;
