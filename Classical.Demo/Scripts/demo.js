var Demo;
(function (Demo) {
    var u = Classical.Utilities;
    var r = Classical.Reflection;
    window.onload = function () {
        var stringMethods = "".getType().getMethods().orderBy(function (p) { return p.name; });
        log("The methods of a String:", stringMethods.query().select(function (m) { return u.format("{0}: {1}", m.name, m.declaringType.name); }));
        var dateProperties = typeOf(Date).getProperties().orderBy(function (p) { return p.name; });
        log("The properties of a Date:", dateProperties.query().select(function (p) { return u.format("{0}: {1}", p.name, p.declaringType.name); }));
        var datePropertiesOnDate = dateProperties.where(function (p) { return p.declaringType == typeOf(Date); }).orderBy(function (p) { return p.name; });
        log("The properties of a Date defined on Date:", datePropertiesOnDate.query().select(function (p) { return u.format("{0}: {1}", p.name, p.declaringType.name); }));
        var datePropertiesNotOnDate = dateProperties.where(function (p) { return p.declaringType != typeOf(Date); }).orderBy(function (p) { return p.name; });
        log("The properties of a Date not defined on Date:", datePropertiesNotOnDate.query().select(function (p) { return u.format("{0}: {1}", p.name, p.declaringType.name); }));
        var reflectionTypes = typeOf(Classical.Reflection.Type).module
            .getTypes().orderBy(function (t) { return t.name; });
        log("The classes in the Classical.Reflection module:", reflectionTypes.select(function (t) { return t.name; }));
        log("The inheritance heirarchy of Classical.Reflection", reflectionTypes.select(function (t) { return u.format("{0} extends {1}", t.name, t.base.name); }));
        var allClasses = [];
        var modules = [r.Module.global];
        while (modules.query().hasAny()) {
            var module = modules.pop();
            modules.addRange(module.getModules());
            allClasses.addRange(module.getTypes());
        }
        log("All classes defined in the browser", allClasses.query()
            .select(function (t) {
            return {
                name: t.name,
                fullName: t.fullName
            };
        })
            .orderBy(function (t) { return t.fullName; })
            .select(function (t) { return [
            u.format('Class Name:    {0}', t.name),
            u.format(':   Full Name: {0}', t.fullName)
        ]; })
            .selectMany(function (a) { return a; }));
    };
    function log(message, input) {
        console.log(message);
        b(message);
        if (!input)
            input = [];
        input.query().forEach(function (item) {
            var output = u.isNullOrUndefined(item) ? "" : item.toString();
            console.log(output);
            div(output);
        });
        console.log("");
        br();
    }
    function b(text) {
        var b = document.createElement('b');
        var body = document.getElementsByTagName('body')[0];
        b.textContent = text;
        body.appendChild(b);
    }
    function div(text) {
        var div = document.createElement('div');
        var body = document.getElementsByTagName('body')[0];
        div.textContent = text;
        body.appendChild(div);
    }
    function br() {
        var br = document.createElement('br');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(br);
    }
})(Demo || (Demo = {}));
