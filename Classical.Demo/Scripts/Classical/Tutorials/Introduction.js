/// <reference path="../classical.d.ts" />
/// <reference path="../classical.html.d.ts" />
var Classical;
(function (Classical) {
    var Tutorial;
    (function (Tutorial) {
        var Introduction;
        (function (Introduction) {
            var u = Classical.Utilities;
            var r = Classical.Reflection;
            var cc = Classical.Collections;
            var section = function () { return console.log(" "); };
            section();
            var Response = (function () {
                function Response() {
                }
                Object.defineProperty(Response.prototype, "first", {
                    get: function () { return "Get it?"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Response.prototype, "second", {
                    get: function () { return "Got it!"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Response.prototype, "third", {
                    get: function () { return "Good"; },
                    enumerable: true,
                    configurable: true
                });
                return Response;
            })();
            var response = new Response();
            response
                .getType()
                .getProperties()
                .where(function (property) { return property.declaringType === typeOf(Response); })
                .orderBy(function (property) { return property.name; })
                .forEach(function (property) { return console.log(property.getValue(response)); });
            section();
            typeOf(cc.Queryable)
                .getProperties(r.Public, r.Private, r.Instance, r.Static)
                .where(function (p) { return p.declaringType === typeOf(cc.Queryable); })
                .forEach(function (p) { return console.log('Queryable.' + p.name); });
            section();
            section();
            function printHashCode(type, value) {
                console.log(u.format("{0} hash code for value {1}: {2}", type, value.is(Array) ?
                    '[' + value + ']' :
                    value.toString(), value.getHashCode()));
            }
            printHashCode('Boolean', true);
            printHashCode('Number', -223.148);
            printHashCode('String', 'gobbledygook');
            printHashCode('Array', [1, 2, 3]);
            section();
            function printHashCodeAgain(type, value) {
                console.log(u.format("{0} hash code for value {1} is the same as before: {2}", type, value.is(Array) ?
                    '[' + value + ']' :
                    value.toString(), value.getHashCode()));
            }
            printHashCodeAgain('Boolean', true);
            printHashCodeAgain('Boolean', true);
            printHashCodeAgain('Boolean', true);
            printHashCodeAgain('Boolean', true);
            printHashCodeAgain('Number', -223.148);
            printHashCodeAgain('Number', -223.148);
            printHashCodeAgain('Number', -223.148);
            printHashCodeAgain('Number', -223.148);
            printHashCodeAgain('String', 'gobbledygook');
            printHashCodeAgain('String', 'gobbledygook');
            printHashCodeAgain('String', 'gobbledygook');
            printHashCodeAgain('String', 'gobbledygook');
            printHashCodeAgain('Array', [1, 2, 3]);
            printHashCodeAgain('Array', [1, 2, 3]);
            printHashCodeAgain('Array', [1, 2, 3]);
            printHashCodeAgain('Array', [1, 2, 3]);
            section();
            var constructorMap = new cc.Dictionary()
                .add(typeOf(Boolean), Boolean)
                .add(typeOf(Number), Number)
                .add(typeOf(String), String)
                .add(typeOf(Array), Array);
            constructorMap.query()
                .orderBy(function (pair) { return pair.key.name; })
                .skip(1).take(3).concat(constructorMap.query()
                .orderBy(function (pair) { return pair.key.name; })
                .take(1))
                .forEach(function (pair) {
                var type = pair.key, typeName = type.name, ctor = pair.value, space = cc.Enumerable
                    .range(1, 8 - typeName.length).query()
                    .select(function (n) { return ' '; })
                    .aggregate(function (a, b) { return a + b; }), ctorView = ctor.toString()
                    .replace('[native code]', u.format('/* {0}s are created here */', typeName));
                console.log(u.format('{0} Type {1} =>  {2}', typeName, space, ctorView));
            });
            section();
        })(Introduction = Tutorial.Introduction || (Tutorial.Introduction = {}));
    })(Tutorial = Classical.Tutorial || (Classical.Tutorial = {}));
})(Classical || (Classical = {}));
