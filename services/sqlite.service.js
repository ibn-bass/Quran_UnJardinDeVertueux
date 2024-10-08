import SQLite from 'react-native-sqlite-storage';
import {
    DB_NAME,
    DB_LOCATION,
    DB_SCHEMA_1,
    SURAHS_TABLE_NAME,
    AYAHS_TABLE_NAME,
    SAJDAS_TABLE_NAME,
    RUKUS_TABLE_NAME,
    PAGES_TABLE_NAME,
    MANZILS_TABLE_NAME,
    HIZBQUARTERS_TABLE_NAME,
    JUZS_TABLE_NAME,
    NB_JUZS,
} from '../CONSTANTES';


export default class SqliteService {
    db = null;

    constructor (){
    }

    async getDBConnection  (){

        try {
            this.db = SQLite.openDatabase(
                {
                    name: DB_NAME,
                    location: DB_LOCATION,
                },
                () => {},
                (error) => { 
                    console.log(error) 
                }
            );
        } catch (error) {
            console.error(error)
        }
      
    };

    connexionDBIsOK (){
        return this.db != null;
    }

    async createTables () {
        try {
            if(this.db == null){
                await this.getDBConnection();
            }

            await this.db.transaction(async (tx) => {
                for (let index = 0; index < DB_SCHEMA_1.length; index++) {
                    const SqlTable = DB_SCHEMA_1[index];
                    await tx.executeSql(SqlTable);
                }

            })
            
        }catch (error) {
            console.error(error)
        }
    }
    

    async initializePlugin() {
        try {

            await this.createTables();
            // await this.getData();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }


    async querySql(sql_scripte,params_sql){
        if(this.db == null){
            await this.getDBConnection();
        }
            
        if(this.db != null){

            const callbackPromise = (sql,params, callbackResolve,callbackRject) => {
                this.db.transaction(tx => {
                    tx.executeSql(
                        sql,
                    params,
                    (tx, rts) => {
                        callbackResolve(rts);
                    },
                    (_, error) => callbackRject (error)
                    );
                });
            };


            try {
                return await new Promise((resolve,reject) => callbackPromise(sql_scripte,params_sql, resolve,reject));
            } catch (error) {
                return await new Promise.reject(error);
            }
        }
    }

    async isInitDb(){
        let isOK = false
        try {
            const promiseRespon = await this.querySql("SELECT name FROM sqlite_master WHERE type= ? ",['table'])

            if (promiseRespon) {
                if (promiseRespon.rows.length > 0) {
                    isOK = true
                } else {
                    isOK = true
                }
            } else {
                isOK = false
            }
        } catch (error) {
            isOK = false
        }

        return isOK;
    }

    async isConfigDB () {
        let  isOK = true;

        try {
            if(this.db == null){
                await this.getDBConnection();
            }

            const promiseRespon_juzs = await this.querySql("SELECT * FROM "+JUZS_TABLE_NAME,[]);

            if(promiseRespon_juzs.rows.length != NB_JUZS){
                isOK = false;
            }
        } catch (error) {
            console.error(error);
            isOK = false;
        }

        return isOK;
    }

    async setEmptyDB (){
        let sqls = [
            `DELETE FROM  ${SURAHS_TABLE_NAME}`,
            `DELETE FROM  ${AYAHS_TABLE_NAME}`,
            `DELETE FROM  ${SAJDAS_TABLE_NAME}`,
            `DELETE FROM  ${RUKUS_TABLE_NAME}`,
            `DELETE FROM  ${PAGES_TABLE_NAME}`,
            `DELETE FROM  ${MANZILS_TABLE_NAME}`,
            `DELETE FROM  ${HIZBQUARTERS_TABLE_NAME}`,
            `DELETE FROM  ${JUZS_TABLE_NAME}`
        ]

        for (let index = 0; index < sqls.length; index++) {
            const sql = sqls[index];
            await this.querySql(sql,[]);
        }

    }
    
      
    async setMetaDataQuran (data,dispatch) {
      try {
        dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:'Enregistrement des données ...',text:""}})

        let surahs_sql = (data.surahs.references).map((surah)  => {
            return {
                sql: `INSERT INTO  ${SURAHS_TABLE_NAME}(
                        number,
                        name,
                        englishName,
                        englishNameTranslation,
                        numberOfAyahs,
                        revelationType) 
                    VALUES (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )`,
                values : [
                    surah.number,
                    surah.name,
                    surah.englishName,
                    surah.englishNameTranslation,
                    surah.numberOfAyahs,
                    surah.revelationType
                ]
            };
        });

        let ayahs_sql = (data.ayahs.references).map((ayah)  => {
            return {
                sql: `INSERT INTO  ${AYAHS_TABLE_NAME}(
                        number,
                        text,
                        numberInSurah,
                        juz,
                        manzil,
                        page,
                        ruku,
                        hizbQuarter,
                        sajda
                    ) 
                    VALUES (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )`,
                values : [
                    ayah.number,
                    ayah.text,
                    ayah.numberInSurah,
                    ayah.juz,
                    ayah.manzil,
                    ayah.page,
                    ayah.ruku,
                    ayah.hizbQuarter,
                    ayah.sajda ? 1 : 0
                ]
            };
        });


        let sajdas_sql = (data.sajdas.references).map((sajda)  => {
            return {
                sql: `INSERT INTO  ${SAJDAS_TABLE_NAME}(
                        surah,
                        ayah,
                        recommended,
                        obligatory
                    )

                    VALUES (
                       ?,
                       ?,
                       ?,
                       ?
                    )`,
                values : [
                    sajda.surah,
                    sajda.ayah,
                    sajda.recommended ? 1 : 0,
                    sajda.obligatory ? 1 : 0
                ]
            };
        });
        let rukus_sql = (data.rukus.references).map((ruku)  => {
            return {
                sql:`INSERT INTO  ${RUKUS_TABLE_NAME}(
                        surah,
                        ayah
                    )
                    VALUES (
                        ?,
                        ?
                    )`,
                values : [
                    ruku.surah,
                    ruku.ayah
                ]
            };
        });

        let pages_sql = (data.pages.references).map((page)  => {
            return {
                sql:`INSERT INTO  ${PAGES_TABLE_NAME}(
                            surah,
                            ayah
                        )
                        VALUES (
                            ?,
                            ?
                        )`,
                    values : [
                        page.surah,
                        page.ayah
                    ]
            };
            
        });

        let manzils_sql = (data.manzils.references).map((manzil)  => {
            return {
                sql:`INSERT INTO  ${MANZILS_TABLE_NAME}(
                            surah,
                            ayah
                        )
                        VALUES (
                            ?,
                            ?
                        )`,
                    values : [
                        manzil.surah,
                        manzil.ayah
                    ]
            };
            
        });

        let hizbQuarters_sql = (data.hizbQuarters.references).map((hizbQuarter)  => {
            return {
                sql:`INSERT INTO  ${HIZBQUARTERS_TABLE_NAME}(
                            surah,
                            ayah
                        )
                        VALUES (
                            ?,
                            ?
                        )`,
                    values : [
                        hizbQuarter.surah,
                        hizbQuarter.ayah
                    ]
            };
        });

        let juzs_sql = (data.juzs.references).map((juz)  => {
            return {
                sql:`INSERT INTO  ${JUZS_TABLE_NAME}(
                            surah,
                            ayah
                        )
                        VALUES (
                            ?,
                            ?
                        )`,
                    values : [
                        juz.surah,
                        juz.ayah
                    ]
            };
        });

        let sqls = [
            surahs_sql,
            ayahs_sql,
            sajdas_sql,
            rukus_sql,
            pages_sql,
            manzils_sql,
            hizbQuarters_sql,
            juzs_sql
        ];

        if(this.db == null){
            await this.getDBConnection();
        }   

        await this.db.transaction(async (tx) => {
            for (let index = 0; index < sqls.length; index++) {
                const sqls_item = sqls[index];
                for (let index2 = 0; index2 < sqls_item.length; index2++) {
                    const sql = sqls_item[index2].sql;
                    const values = sqls_item[index2].values;
                    await tx.executeSql(
                        sql,
                        values
                    );
                }
            }
        })
        
      } catch (error) {
        console.error(error);
      }
    }
  
  }
  
