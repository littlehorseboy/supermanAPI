import mysql from 'mysql';
import jwt from 'jsonwebtoken';

import config from '../../config/config';

const connectionPool = mysql.createPool({
  connectionLimit: 10, // 限制池子連線人數
  host: config.mysqlHost, // 主機名稱
  user: config.mysqlUserName, // 用戶名稱
  password: config.mysqlPass, // 資料庫密碼
  database: config.mysqlDatabase // 資料庫名稱
});

/** mapTalk GET 取得 */
const selectmapTalk = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('SELECT * FROM mapTalk', (error, result) => {
          if (error) {
            console.log('SQL error: ', error);
            reject(error);
          } else {
            resolve(result);
          }
          connection.release();
        });
      }
    });
  });
};

/** mapTalk POST 新增 */
const createmapTalk = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('INSERT INTO mapTalk SET ?', insertValues, (error, result) => {
          if (error) {
            console.log('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve(`新增成功! mapTalk_id: ${result.insertId}`);
          }
          connection.release();
        });
      }
    });
  });
};

/** mapTalk PUT 修改 */
const modifymapTalk = (insertValues, userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('UPDATE mapTalk SET ? WHERE id= ? ', [insertValues, userId], (error, result) => {
          if (error) {
            console.log('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 0) {
            resolve('請確認修改Id!');
          } else if (result.message.match('Changed: 1')) {
            resolve('資料修改成功!');
          } else {
            resolve('資料無異動');
          }
          connection.release();
        });
      }
    });
  });
};

/** mapTalk DELETE 新增 */
const deletemapTalk = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('DELETE FROM mapTalk WHERE id = ?', userId, (error, result) => {
          if (error) {
            console.log('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve('刪除成功');
          } else {
            resolve('刪除失敗');
          }
          connection.release();
        });
      }
    });
  });
};

/** mapTalk GET JWT取得個人文章 */
const selectPersonalmapTalk = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'my_secret_key', (err, decoded) => {
      if (err) {
        reject(err); // 驗證失敗
      } else {
        // JWT 驗證成功 -> 取得用戶 user_id
        const userId = decoded.payload.user_id;
        connectionPool.getConnection((connectionError, connection) => {
          if (connectionError) {
            reject(connectionError);
          } else {
            connection.query('SELECT * FROM mapTalk WHERE user_id = ?', userId, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
              connection.release();
            });
          }
        });
        // resolve(decoded); // 驗證成功回傳 decoded data
      }
    });
  });
};

export default {
  selectmapTalk,
  createmapTalk,
  modifymapTalk,
  deletemapTalk,
  selectPersonalmapTalk
};
