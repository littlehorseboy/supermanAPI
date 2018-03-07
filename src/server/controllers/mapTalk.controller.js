import mapTalkModule from '../modules/mapTalk.module';

/** mapTalk GET 取得 */
const mapTalkGet = (req, res) => {
  mapTalkModule.selectmapTalk().then((result) => {
    res.send(result);
  }).catch((err) => {
    return res.send(err);
  });
};

/** mapTalk POST 新增 */
const mapTalkPost = (req, res) => {
  // 取得新增參數
  const insertValues = req.body;
  mapTalkModule.createmapTalk(insertValues).then((result) => {
    res.send(result);
  }).catch((err) => {
    return res.send(err);
  });
};

/** mapTalk PUT 修改 */
const mapTalkPut = (req, res) => {
  // 取得修改id
  const userId = req.params.mapTalk_id;
  // 取得新增參數
  const insertValues = req.body;
  mapTalkModule.modifymapTalk(insertValues, userId).then((result) => {
    res.send(result);
  }).catch((err) => {
    return res.send(err);
  });
};

/** mapTalk DELETE 新增 */
const mapTalkDelete = (req, res) => {
  // 取得刪除id
  const userId = req.params.mapTalk_id;
  mapTalkModule.deletemapTalk(userId).then((result) => {
    res.send(result);
  }).catch((err) => {
    return res.send(err);
  });
};

/** mapTalk GET JWT取得個人文章 */
const mapTalkPersonalGet = (req, res) => {
  mapTalkModule.selectPersonalmapTalk(req.token).then((result) => {
    res.send(result);
  }).catch((err) => {
    return res.status(401).send(err);
  });
};

export default {
  mapTalkGet,
  mapTalkPost,
  mapTalkPut,
  mapTalkDelete,
  mapTalkPersonalGet
};
