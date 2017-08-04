/*
  Copyright (c) 2013, Dan VerWeire<dverweire@gmail.com>
  Copyright (c) 2010, Lee Smith<notwink@gmail.com>

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted, provided that the above
  copyright notice and this permission notice appear in all copies.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

#ifndef _SRC_ODBC_CONNECTION_H
#define _SRC_ODBC_CONNECTION_H

#include <nan.h>

class ODBCConnection : public Nan::ObjectWrap {
  public:
   static Nan::Persistent<String> OPTION_SQL;
   static Nan::Persistent<String> OPTION_PARAMS;
   static Nan::Persistent<String> OPTION_NORESULTS;
   static Nan::Persistent<Function> constructor;
   
   static void Init(v8::Handle<Object> exports);
   
   void Free();
   
  protected:
    ODBCConnection() {};
    
    explicit ODBCConnection(HENV hENV, HDBC hDBC): 
      Nan::ObjectWrap(),
      m_hENV(hENV),
      m_hDBC(hDBC) {};
     
    ~ODBCConnection();

public:
    //constructor
    static NAN_METHOD(New);

    //Property Getter/Setters
    static NAN_GETTER(ConnectedGetter);
    static NAN_GETTER(ConnectTimeoutGetter);
    static NAN_SETTER(ConnectTimeoutSetter);
    static NAN_GETTER(LoginTimeoutGetter);
    static NAN_SETTER(LoginTimeoutSetter);

    //async methods
    static NAN_METHOD(BeginTransaction);
protected:
    static void UV_BeginTransaction(uv_work_t* work_req);
    static void UV_AfterBeginTransaction(uv_work_t* work_req, int status);

public:
    static NAN_METHOD(EndTransaction);
protected:
    static void UV_EndTransaction(uv_work_t* work_req);
    static void UV_AfterEndTransaction(uv_work_t* work_req, int status);
    
public:    
    static NAN_METHOD(Open);
protected:
    static void UV_Open(uv_work_t* work_req);
    static void UV_AfterOpen(uv_work_t* work_req, int status);

public:
    static NAN_METHOD(Close);
protected:
    static void UV_Close(uv_work_t* work_req);
    static void UV_AfterClose(uv_work_t* work_req, int status);

public:
    static NAN_METHOD(CreateStatement);
protected:
    static void UV_CreateStatement(uv_work_t* work_req);
    static void UV_AfterCreateStatement(uv_work_t* work_req, int status);

public:
    static NAN_METHOD(Query);
protected:
    static void UV_Query(uv_work_t* req);
    static void UV_AfterQuery(uv_work_t* req, int status);

public:
    static NAN_METHOD(Columns);
protected:
    static void UV_Columns(uv_work_t* req);

public:
    static NAN_METHOD(Tables);
protected:
    static void UV_Tables(uv_work_t* req);
    
    //sync methods
public:
    static NAN_METHOD(CloseSync);
    static NAN_METHOD(CreateStatementSync);
    static NAN_METHOD(OpenSync);
    static NAN_METHOD(QuerySync);
    static NAN_METHOD(BeginTransactionSync);
    static NAN_METHOD(EndTransactionSync);
protected:

    struct Fetch_Request {
      Nan::Callback* callback;
      ODBCConnection *objResult;
      SQLRETURN result;
    };
    
    ODBCConnection *self(void) { return this; }

  protected:
    HENV m_hENV;
    HDBC m_hDBC;
    SQLUSMALLINT canHaveMoreResults;
    bool connected;
    int statements;
    SQLUINTEGER connectTimeout;
    SQLUINTEGER loginTimeout;
};

struct create_statement_work_data {
  Nan::Callback* cb;
  ODBCConnection *conn;
  HSTMT hSTMT;
  int result;
};

struct query_work_data {
  Nan::Callback* cb;
  ODBCConnection *conn;
  HSTMT hSTMT;
  
  Parameter *params;
  int paramCount;
  int completionType;
  bool noResultObject;
  
  void *sql;
  void *catalog;
  void *schema;
  void *table;
  void *type;
  void *column;
  
  int sqlLen;
  int sqlSize;
  
  int result;
};

struct open_connection_work_data {
  Nan::Callback* cb;
  ODBCConnection *conn;
  int result;
  int connectionLength;
  void* connection;
};

struct close_connection_work_data {
  Nan::Callback* cb;
  ODBCConnection *conn;
  int result;
};

#endif
