/**
 * Test the knx specific transforms
 *
 * @author Christian Mayer
 * @since 2016
 */
define(['TransformDefault', 'TransformKnx'], function(Transform) {
  
  var testcases = [
    { transform: 'DPT:1',     type: 'encode', source: 0,    target: '80' },
    { transform: 'DPT:1',     type: 'encode', source: 1,    target: '81' },
    { transform: 'DPT:1.001', type: 'encode', source: 1,    target: '81' },
    { transform: 'DPT:1',     type: 'decode', source: '00', target: 0    },
    { transform: 'DPT:1',     type: 'decode', source: '01', target: 1    },
    
    // dummy tests for dummy implementation
    { transform: 'DPT:2',     type: 'encode', source: 0,    target: '80' },
    { transform: 'DPT:2',     type: 'decode', source: '00', target: 0    },
    
    // dummy tests for dummy implementation
    { transform: 'DPT:3',     type: 'encode', source: 0,    target: '80' },
    { transform: 'DPT:3',     type: 'decode', source: '00', target: 0    },
    
    { transform: 'DPT:4',     type: 'encode', source: 'a',  target: '8061', noNumber: true },
    { transform: 'DPT:4',     type: 'decode', source: '61', target: 'a'    },
    
    { transform: 'DPT:5.001', type: 'encode', source: 0,    target: '8000' },
    { transform: 'DPT:5.001', type: 'encode', source: 100,  target: '80ff' },
    { transform: 'DPT:5.001', type: 'decode', source: '00', target: 0      },
    { transform: 'DPT:5.001', type: 'decode', source: 'ff', target: 100    },
    { transform: 'DPT:5.003', type: 'encode', source: 0,    target: '8000' },
    { transform: 'DPT:5.003', type: 'encode', source: 100,  target: '8046' },
    { transform: 'DPT:5.003', type: 'encode', source: 360,  target: '80ff' },
    { transform: 'DPT:5.003', type: 'decode', source: '00', target: 0      },
    { transform: 'DPT:5.003', type: 'decode', source: 'ff', target: 360    },
    { transform: 'DPT:5.004', type: 'encode', source: 0,    target: '8000' },
    { transform: 'DPT:5.004', type: 'encode', source: 100,  target: '8064' },
    { transform: 'DPT:5.004', type: 'encode', source: 255,  target: '80ff' },
    { transform: 'DPT:5.004', type: 'decode', source: '00', target: 0      },
    { transform: 'DPT:5.004', type: 'decode', source: 'ff', target: 255    },
    { transform: 'DPT:5.010', type: 'encode', source: 0,    target: '8000' },
    { transform: 'DPT:5.010', type: 'encode', source: 100,  target: '8064' },
    { transform: 'DPT:5.010', type: 'encode', source: 255,  target: '80ff' },
    { transform: 'DPT:5.010', type: 'decode', source: '00', target: 0      },
    { transform: 'DPT:5.010', type: 'decode', source: 'ff', target: 255    },
  ];

  describe('checking knx transforms', function() {
    // run testcases
    testcases.forEach( function( testcase, index ){
      it( 'should transform ' + testcase.transform + ' ' + testcase.type + ' "' + testcase.source + '" (test #' + index + ')', function(){
        switch( testcase.type ) {
          case 'encode':
            // test direct
            expect(Transform.Transform[ testcase.transform ].encode( testcase.source )).toEqual( testcase.target );
            if( !testcase.noNumber )
            {
              // test integer
              expect(Transform.Transform[ testcase.transform ].encode( testcase.source|0  )).toEqual( testcase.target );
              // test float
              expect(Transform.Transform[ testcase.transform ].encode( +testcase.source   )).toEqual( testcase.target );
              // test string
              expect(Transform.Transform[ testcase.transform ].encode( testcase.source+'' )).toEqual( testcase.target );
            }
          break;
          
        case 'decode':
          expect(Transform.Transform[ testcase.transform ].decode( testcase.source )).toEqual( testcase.target );
          break;
        }
      });
    });
  });
});