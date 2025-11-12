import mysql from 'mysql2/promise';
require('dotenv').config();

class MySQLConnector {
  private connection: mysql.Connection | null;
    execute: any;
    end: any;

  
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (!this.connection) {
      const {DBHOST, DBUSER, DBPASSWORD, DBNAME} = process.env
      this.connection = await mysql.createConnection({
        host: DBHOST,
        user: DBUSER,
        password: DBPASSWORD,
        database: DBNAME,
      });

      console.log('Conectado a MySQL');
    }
  }

  async query(sql: string, values?: any) {
    if (!this.connection) {
      throw new Error('No se ha establecido una conexión a MySQL.');
    }

    const respQuery = await this.connection.execute(sql, values);

    this.close()
    return respQuery[0];
    
  }

  async close() {
    if (this.connection) {
      await this.connection.end();
      console.log('Conexión cerrada.');
      this.connection = null;
    }
  }
}

export default MySQLConnector;
