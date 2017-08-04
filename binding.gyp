{
  'targets' : [
    {
      'target_name' : 'odbc_bindings',
      'sources' : [
        'src/odbc.cpp',
        'src/odbc_connection.cpp',
        'src/odbc_statement.cpp',
        'src/odbc_result.cpp',
        'src/dynodbc.cpp'
      ],
      'cflags' : ['-Wall', '-Wextra', '-Wno-unused-parameter'],
      'include_dirs': [
        "<!(node -e \"require('nan')\")"
      ],
      'defines' : [
        'UNICODE'
      ],
      'conditions' : [
        [ 'OS == "linux"', {
          'libraries' : [
            '-L${SYBASE}/DataAccess64/ODBC/lib',
            '-lsybdrvodb'
          ],
          'cflags' : [
            '-g'
          ]
        }],
        [ 'OS == "mac"', {
          'libraries' : [
            '-L/usr/local/lib',
            '-lodbc'
          ]
        }],
        [ 'OS=="win"', {
          'sources' : [
            'src/strptime.c',
            'src/odbc.cpp'
          ],
          'libraries' : [
             '-l$(SYBASE)\\DataAccess64\ODBC\dll\sybdrvodb64.lib'
          ],
          'msvs_settings' : {
              'VCLinkerTool': {
                'IgnoreDefaultLibraryNames': 'odbc32.lib;odbccp32.lib',
              },
            },
        }]
      ]
    }
  ]
}
