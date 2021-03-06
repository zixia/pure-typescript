/**
 * Pure TypeScript
 *
 * Treat typescript as the first class citizen!
 *
 * for Full Stack TypeScript Developer:
 *  - No more compile
 *  - Zero settings
 *  - Write then Run like JavaScript
 *
 * GitHub: https://github.com/zixia/pure-typescript
 *
 */
'use strict'

const { test } = require('tap')
const sinon = require('sinon')

const pureTypeScript = require('..')

test('Basic smoking test', t => {
  t.equal(typeof pureTypeScript, 'function', 'should get pureTypeScript instance of "function"')

  const spy = sinon.spy()
  const mockModule = { _compile: spy }

  t.doesNotThrow(_ => {
    pureTypeScript(mockModule, 'test/fixture/basic.ts')
  }, 'should compile ok for basic ts file')
  t.ok(spy.calledOnce, 'should call _compile once after load basic.ts')
  t.equal(spy.getCall(0).args[0]
            , 'let n;\nn = 3;\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC9maXh0dXJlL2Jhc2ljLnRzIiwic291cmNlcyI6WyJ0ZXN0L2ZpeHR1cmUvYmFzaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxDQUFTLENBQUE7QUFDYixDQUFDLEdBQUcsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsibGV0IG46IG51bWJlclxubiA9IDNcbiJdfQ=='
            , 'should compile with expected content'
        )
  t.equal(spy.getCall(0).args[1], 'test/fixture/basic.ts', 'should compile with expected filename')

  t.end()
})

test('Basic type error', t => {
  const spy = sinon.spy()
  const mockModule = { _compile: spy }

  t.throws(_ => {
    pureTypeScript(mockModule, 'test/fixture/basic-error.ts')
  }, 'should throw when compile error')
  t.ok(!spy.called, 'should not call _compile when load basic-error.ts')

  t.end()
})

test('Async/Await', t => {
  const spy = sinon.spy()
  const mockModule = { _compile: spy }

  t.doesNotThrow(_ => {
    pureTypeScript(mockModule, 'test/fixture/async-await.ts')
  }, 'should not throw for async/await')
  t.ok(spy.called, 'should call _compile when load async-await.ts')

  t.end()
})
