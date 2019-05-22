//mongodb config=================================================================================
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const dbname = 'jd';
const dbServer = `mongodb://jd:${encodeURIComponent('Ipg1@#')}@34.208.174.174:27017/jd`;
const useNewUrlParse = {useNewUrlParser: true};
const collectionName = 'liepin';

//create mongodb collections=====================================================================

new Promise((resolve, reject) => {
    MongoClient.connect(dbServer, useNewUrlParse, (err, db) => {
        resolve({err, db})
    })
}).then(({err, db}) => {
    if (err) {
        console.log('connecting to db error. db not connected.');
        throw err
    }
    
    //check meta data in db so the db won't be created and initialized twice
    return new Promise((resolve, reject) => {
        let dbo = db.db(dbname);
        dbo.collection(collectionName, {strict: true}, (err, res) => {
            resolve({err, res, db});
        })
    });
}).then(({err, res, db}) => {
    if (err) {
        //should create the collection
        const dbo = db.db(dbname);
        return new Promise((resolve, reject) => {
            dbo.createCollection(collectionName, {strict: false}, (err, res) => {
                resolve({err, res, db, dbo});
            });
        });
    }
    else {
        console.log('OK: liepin collection has EXISTED.');
        db.close();
        
        //use exception to skip the collection creation
        throw new Error('NotError');
    }
}).then(({err, res, db, dbo}) => {
    if (err) {
        console.log('liepin collection not created.');
        db.close();
        throw err;
    }
    
    console.log('OK: liepin collection CREATED');
    db.close();
}).catch((err) => {
    if (err.message !== 'NotError')
        console.log('XXX Error Occurred. Check message for details. XXX :: ', err);
});


const insertJob = (jobDetails, callback) => {
    MongoClient.connect(dbServer, useNewUrlParse, (err, db) => {
        if (err) {
            db.close();
            callback(err, 0x01);
            return;
        }
        
        try {
            let dbo = db.db(dbname),
                query = {"_id": jobDetails._id},
                increase = {$inc: {count: 1}};
            
            dbo.collection(collectionName).findOne(query, (err, result) => {
                if (err) {
                    db.close();
                    callback(err, 0x02);
                }
                else if (result === null) {
                    //not found the job in db. to insert a new record
                    dbo.collection(collectionName).insertOne(jobDetails,
                        (err, res) => {
                            if (err) {
                                callback(err, 0x03);
                            }
                            
                            db.close();
                        });
                }
                else {
                    //found. increase the count of the record
                    let t = dbo.collection(collectionName);
                    t.updateOne(query, increase, (err, res) => {
                        if (err) {
                            callback(err, 0x04);
                        }
                        else {
                            callback(null, 0);
                        }
                        
                        db.close();
                    });
                }
            });
        }
        catch (ex) {
            db.close();
            callback(ex, 0x05);
        }
    });
};


module.exports = {
    insertJob
};