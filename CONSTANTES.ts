export const ROLE_USER = "ROLE_USER";
export const ROLE_ADMIN = "ROLE_ADMIN";

// url API
export const API_QURAN_BASE_URL = 'https://api.alquran.cloud/v1';   
// API_QURAN_BASE_URL+ '    ' : Renvoie toutes les métadonnées sur le Coran disponibles dans cette API   
// API_QURAN_BASE_URL+ '/quran/ar.alafasy' :  (Audio) Renvoie la récitation du Coran par Mishary Alafasy
// API_QURAN_BASE_URL+ '/surah' :  Liste des sourate
// API_QURAN_BASE_URL+ '/surah/{num_sourate}' :  Liste des sourate
// /surah/{num_sourate}/fr.asad : Liste des ayats de la sourate

export const SECRET_KEY = 'flex-db@caisse';


//tables de la base de données
export const DB_NAME = "db_un_jardin_de_vertueux";
export const DB_LOCATION = 'default';
export const DB_CREATE_FROM_LOCATION = "~db_un_jardin_de_vertueux.db";

export const SURAHS_TABLE_NAME = "t_surahs";
export const AYAHS_TABLE_NAME = "t_ayahs";
export const SAJDAS_TABLE_NAME = "t_sajdas";
export const RUKUS_TABLE_NAME = "t_rukus";
export const PAGES_TABLE_NAME = "t_pages";
export const MANZILS_TABLE_NAME = "t_manzils";
export const HIZBQUARTERS_TABLE_NAME = "t_hizbQuarters";
export const JUZS_TABLE_NAME="t_juzs";

export const NB_SURAHS = 114;
export const NB_SAJDAS = 15;
export const NB_RUKUS = 556;
export const NB_PAGES = 604;
export const NB_MANZILS = 7;
export const NB_HIZBQUARTERS = 240;
export const NB_JUZS=30;
export const NB_AYAHS= 6236;



//ajouter date facturation version suivante : date_facturation DATETIME,
export const DB_SCHEMA_1: string[] =
[
    `CREATE TABLE IF NOT EXISTS ${SURAHS_TABLE_NAME} (
        number SMALLINT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        englishName TEXT NOT NULL,
        englishNameTranslation TEXT NOT NULL,
        numberOfAyahs SMALLINT NOT NULL,
        revelationType TEXT NOT NULL
    );`
    ,

    `CREATE TABLE IF NOT EXISTS ${AYAHS_TABLE_NAME} (
        number SMALLINT PRIMARY KEY NOT NULL,
        text TEXT NOT NULL,
        numberInSurah SMALLINT NOT NULL,
        juz SMALLINT NOT NULL,
        manzil SMALLINT NOT NULL,
        page SMALLINT NOT NULL,
        ruku SMALLINT NOT NULL,
        hizbQuarter SMALLINT NOT NULL,
        sajda SMALLINT NOT NULL
    );`
    
    ,

    `CREATE TABLE IF NOT EXISTS ${SAJDAS_TABLE_NAME} (
        surah SMALLINT NOT NULL,
        ayah SMALLINT NOT NULL,
        recommended SMALLINT DEFAULT 0,
        obligatory SMALLINT DEFAULT 0,
        CONSTRAINT primary_key_${SAJDAS_TABLE_NAME} PRIMARY KEY (surah, ayah)
    );`
    ,

    `CREATE TABLE IF NOT EXISTS ${RUKUS_TABLE_NAME} (
        surah SMALLINT NOT NULL,
        ayah SMALLINT NOT NULL,
        CONSTRAINT primary_key_${RUKUS_TABLE_NAME} PRIMARY KEY (surah, ayah)
    );`
    ,

    `CREATE TABLE IF NOT EXISTS ${PAGES_TABLE_NAME} (
        surah SMALLINT NOT NULL,
        ayah SMALLINT NOT NULL,
        CONSTRAINT primary_key_${PAGES_TABLE_NAME} PRIMARY KEY (surah, ayah)
    );`
    ,

    `CREATE TABLE IF NOT EXISTS ${MANZILS_TABLE_NAME} (
        surah SMALLINT NOT NULL,
        ayah SMALLINT NOT NULL,
        CONSTRAINT primary_key_${MANZILS_TABLE_NAME} PRIMARY KEY (surah, ayah)
    );`
    ,

    `CREATE TABLE IF NOT EXISTS ${HIZBQUARTERS_TABLE_NAME} (
        surah SMALLINT NOT NULL,
        ayah SMALLINT NOT NULL,
        CONSTRAINT primary_key_${HIZBQUARTERS_TABLE_NAME} PRIMARY KEY (surah, ayah)
    );`
    ,

    `CREATE TABLE IF NOT EXISTS ${JUZS_TABLE_NAME} (
        surah SMALLINT NOT NULL,
        ayah SMALLINT NOT NULL,
        CONSTRAINT primary_key_${JUZS_TABLE_NAME} PRIMARY KEY (surah, ayah)
    );`
];