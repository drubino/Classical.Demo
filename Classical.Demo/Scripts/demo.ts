module Demo {
    import c = Classical;
    import u = Classical.Utilities;
    import r = Classical.Reflection;

    window.onload = () => {
        var stringMethods = "".getType().getMethods().orderBy(p => p.name);
        log("The methods of a String:",
            stringMethods.query().select(m => u.format("{0}: {1}",
                m.name, m.declaringType.name)));

        var dateProperties = typeOf(Date).getProperties().orderBy(p => p.name);
        log("The properties of a Date:",
            dateProperties.query().select(p => u.format("{0}: {1}",
                p.name, p.declaringType.name)));

        var datePropertiesOnDate = dateProperties.where(p => p.declaringType == typeOf(Date)).orderBy(p => p.name);
        log("The properties of a Date defined on Date:",
            datePropertiesOnDate.query().select(p => u.format("{0}: {1}",
                p.name, p.declaringType.name)));

        var datePropertiesNotOnDate = dateProperties.where(p => p.declaringType != typeOf(Date)).orderBy(p => p.name);
        log("The properties of a Date not defined on Date:",
            datePropertiesNotOnDate.query().select(p => u.format("{0}: {1}",
                p.name, p.declaringType.name)));

        var reflectionTypes = typeOf(Classical.Reflection.Type).module
            .getTypes().orderBy(t => t.name);
        log("The classes in the Classical.Reflection module:",
            reflectionTypes.select(t => t.name));

        log("The inheritance heirarchy of Classical.Reflection",
            reflectionTypes.select(t => u.format("{0} extends {1}", t.name, t.base.name)));

        var allClasses: Array<r.Type> = [];
        var modules = [r.Module.global];
        while (modules.query().hasAny()) {
            var module = modules.pop();
            modules.addRange(module.getModules());
            allClasses.addRange(module.getTypes());
        }

        log("All classes defined in the browser",
            allClasses.query()
                .select(t => {
                    return {
                        name: t.name,
                        fullName: t.fullName
                    }
                })
                .orderBy(t => t.fullName)
                .select(t => [
                    u.format('Class Name:    {0}', t.name),
                    u.format(':   Full Name: {0}', t.fullName)
                ])
                .selectMany(a => a));

    }

    //#region Utilities

    function log<T>(message: string, input: IEnumerable<T>) {
        console.log(message);
        b(message);

        if (!input)
            input = [];

        input.query().forEach(item => {
            var output = u.isNullOrUndefined(item) ? "" : item.toString();
            console.log(output);
            div(output);
        });

        console.log("");
        br();
    }

    function b(text: string) {
        var b = document.createElement('b');
        var body = document.getElementsByTagName('body')[0];

        b.textContent = text;
        body.appendChild(b);
    }

    function div(text: string) {
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

    //#endregion Utilities
}
