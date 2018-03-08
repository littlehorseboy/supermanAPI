import mapTalkModule from '../modules/maptalk.module';

/** mapTalk GET 取得 */
const dataGet = (req, res) => {
  mapTalkModule.dataSelect().then((result) => {
    res.send(result);
  }).catch((err) => {
    return res.send(err);
  });
};

/** mapTalk POST 新增 */
const dataPost = (req, res) => {
  // 取得新增參數
  const insertValues = req.body;
  mapTalkModule.dataCreate(insertValues).then((result) => {
    res.send(result);
  }).catch((err) => {
    return res.send(err);
  });
};

/** mapTalk PUT 修改 */
const dataPut = (req, res) => {
  // 取得修改id
  const userId = req.params.mapTalk_id;
  // 取得新增參數
  const insertValues = req.body;
  mapTalkModule.dataModify(insertValues, userId).then((result) => {
    res.send(result);
  }).catch((err) => {
    return res.send(err);
  });
};

/** mapTalk DELETE 新增 */
const dataDelete = (req, res) => {
  // 取得刪除id
  const userId = req.params.mapTalk_id;
  mapTalkModule.dataDelete(userId).then((result) => {
    res.send(result);
  }).catch((err) => {
    return res.send(err);
  });
};

/** mapTalk GET JWT取得個人文章 */
const dataPersonalGet = (req, res) => {
  mapTalkModule.dataSelectPersonal(req.token).then((result) => {
    res.send(result);
  }).catch((err) => {
    return res.status(401).send(err);
  });
};

export default {
  dataGet,
  dataPost,
  dataPut,
  dataDelete,
  dataPersonalGet
};
