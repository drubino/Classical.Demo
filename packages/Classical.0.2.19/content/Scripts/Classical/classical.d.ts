/**
 Hash constains the functions for generating hash codes for JavaScript primitives.
 @seealso Boolean, Number, String
*/
declare module Classical.Hash {
    function forBoolean(key: boolean): number;
    function forNumber(key: number, seed?: number): number;
    /**
     JavaScript Implementation of MurmurHash3 (r136) (as of May 20, 2011)
     @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
     @see http://github.com/garycourt/murmurhash-js
     @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
     @see http://sites.google.com/site/murmurhash/
     @param [key] {string} The string to hash.
     @param [seed?] {number} A positive integer seed to generate the hash.
     @return {number} 32-bit positive integer hash
     @remarks
        Null checking is excluded for performance.
        The string must be ASCII only.
        The default seed is 37.
    */
    function forString(key: string, seed?: number): number;
}
declare var global: any;
/**
 The module that performs manipulation of native JavaScript objects.
 @remarks This is the first module of Classical to be initialized.
 @seealso Object, String, Number, Boolean, Array
 @private
*/
declare module Classical._Native {
}
/** An assortment of useful functions for basic type checking and data manipulation. */
declare module Classical.Utilities {
    function areEqual(first: any, second: any): boolean;
    function argumentsToArray<T>(args: IArguments): T[];
    function coalesce<T>(value: T, alternative: T): T;
    function extend(destination: any, source: any): any;
    function format(template: string, ...inputs: any[]): string;
    function titleCase(title: string, ...exclude: string[]): string;
    function sentenceCase(sentence: string, ...ignore: string[]): string;
    function getPropertyNames(value: any): string[];
    function isNull(value: any): boolean;
    function isUndefined(value: any): boolean;
    function isNullOrUndefined(value: any): boolean;
    function isDefined(value: any): boolean;
    function isNumber(value: any): boolean;
    function isNaN(value: any): boolean;
    function isInfinity(value: any): boolean;
    function isInteger(value: any): boolean;
    function isString(value: any): boolean;
    function isBoolean(value: any): boolean;
    function isTrue(value: any): boolean;
    function isTruthy(value: any): boolean;
    function isFalse(value: any): boolean;
    function isFalsy(value: any): boolean;
    function isObject(value: any): boolean;
    function isEmptyObject(value: any): boolean;
    function isArray(value: any): boolean;
    function isFunction(value: any): boolean;
}
/**
 Assert contains a collection of functions which can each be used to construct a proposition about that application.
 If that proposition is false, an exception is thrown containing a message and a stack trace.
 @seealso Classical.Assert.Exception
*/
declare module Classical.Assert {
    function staticClass(): void;
    function isDefined(value: any, message?: string): void;
    function nullOrUndefined(value: any, message?: string): void;
    function isTrue(expression: boolean, message?: string): void;
    function isFalse(expression: boolean, message?: string): void;
    function isInvalid(message?: string): void;
    function notImplemented(message?: string): Exception;
    /**
     A message along with a stack trace that is intended to be thrown to indicate an error.
    */
    class Exception {
        message: string;
        stackTrace: string;
        constructor(message?: string);
        toString(): string;
        setStackTrace(): void;
    }
}
/**
 Declares that a hash code can be created for the object.
 A hash code is a permenanet, non-unqiue but well-distributed
 integer that is associated with the object.=
 @remarks
     An object implementing IHashable can be used as a key in a dictionary.
     IObject implements IHashable so all objects can be used as keys in dictionaries.
     This is also true for booleans, numbers and strings.
 @seealso Classical.Collections.Dictionary
*/
interface IHashable {
    equals(other: any): boolean;
    getHashCode(): number;
}
/**
 IObject defines what it means to be a classical object.
 @remarks
    The core JavaScript Object implements IObject.
    All Objects implement IHashable so they can be used as keys in Dictionaries.
 @seealso IHashable, Classical.Collections.Dictionary
*/
interface IObject extends IHashable {
    is(type: Function): boolean;
    as<TObject>(): TObject;
    getType(): Classical.Reflection.Type;
    watch(property: string, handler: (property: string, oldValue: any, newValue: any) => void): void;
}
/**
 The core JavaScript object.
 @remarks
    Object implements IObject.
    All Objects implement IHashable so they can be used as keys in Dictionaries.
 @seealso IObject, IHashable, Classical.Collections.Dictionary
*/
interface Object extends IObject {
}
/**
 The core JavaScript string.
 @remarks
    String implements IObject.
    All Objects implement IHashable so strings can be used as keys in Dictionaries.
 @seealso IObject, IHashable, Classical.Collections.Dictionary
*/
interface String extends IObject {
}
/**
 The core JavaScript number.
 @remarks
    Number implements IObject.
    All Objects implement IHashable so numbers can be used as keys in Dictionaries.
 @seealso IObject, IHashable, Classical.Collections.Dictionary
*/
interface Number extends IObject {
}
/**
 The core JavaScript boolean.
 @remarks
    Boolean implements IObject.
    All Objects implement IHashable so booleans can be used as keys in Dictionaries.
 @seealso IObject, IHashable, Classical.Collections.Dictionary
*/
interface Boolean extends IObject {
}
/** The core module of Classical.js */
declare module Classical {
}
/**
 Defines the core JavaScript function. IFunction and Function are equivalent.
 @remarks
    This interface was created as an alias so that Function can refer to
    the notion of a function in the reflection library.
*/
interface IFunction extends Function {
}
/**
 The core set of collections defined in Classical.
*/
declare module Classical.Collections {
    class Dictionary<TKey, TValue> implements IEnumerable<KeyValuePair<TKey, TValue>> {
        private _hashTable;
        private _bucketIndex;
        private _numberOfBuckets;
        private _numberOfElements;
        private _initialCapacity;
        keys: IEnumerable<TKey>;
        values: IEnumerable<TValue>;
        constructor(capacity?: number);
        getEnumerator(): IEnumerator<KeyValuePair<TKey, TValue>>;
        query(): IQueryable<KeyValuePair<TKey, TValue>>;
        forEach(operation: (item: KeyValuePair<TKey, TValue>) => void): void;
        array(): KeyValuePair<TKey, TValue>[];
        add(key: TKey, value: TValue): Dictionary<TKey, TValue>;
        remove(key: TKey): Dictionary<TKey, TValue>;
        getValue(key: TKey): TValue;
        containsKey(key: TKey): boolean;
        clear(): void;
        count(): number;
        private getIndex(key);
        private getElements(key);
        private getPair(elements, hashTable, numberOfBuckets, key);
        private addWithoutRebalancing(hashTable, numberOfBuckets, pair, checkForExistance?);
        private rebalanceIfNecessary();
        private rebalance();
    }
    class KeyValuePair<TKey, TValue> {
        key: TKey;
        value: TValue;
        constructor(key: TKey, value: TValue);
    }
}
declare function typeOf(ctor: IFunction): Classical.Reflection.Type;
declare function moduleOf(ctor: IFunction): Classical.Reflection.Module;
/**
 The core set of collections defined in Classical.
*/
declare module Classical.Reflection {
    /**
     An enumeration of the various properties that apply to the
     language construct metadata described by the reflection api.
     @seealso
        Classical.Reflection.Type.getProperties,
        Classical.Reflection.Type.getMethods
    */
    enum Modifier {
        Public = 0,
        Protected = 1,
        Private = 2,
        Instance = 3,
        Static = 4,
    }
    /**
     The public modifier
     @seealso Classical.Reflection.Modifier
    */
    var Public: Modifier;
    /**
     The protected modifier
     @seealso Classical.Reflection.Modifier
    */
    var Protected: Modifier;
    /**
     The private modifier
     @seealso Classical.Reflection.Modifier
    */
    var Private: Modifier;
    /**
     The instance modifier
     @seealso Classical.Reflection.Modifier
    */
    var Instance: Modifier;
    /**
     The static modifier
     @seealso Classical.Reflection.Modifier
    */
    var Static: Modifier;
    /**
     A description of the metadata associated with in a module.
    */
    class Module {
        private _name;
        private _fullName;
        private _scope;
        private _base;
        private _modules;
        private _types;
        private _functions;
        private _variables;
        name: string;
        fullName: string;
        scope: any;
        constructor(password: number, name: string, scope: any, base?: Module);
        getModules(): IQueryable<Module>;
        getTypes(): IQueryable<Type>;
        getFunctions(): IQueryable<Function>;
        getVariables(): IQueryable<Variable>;
        private _initializeModules();
        private _initializeTypes();
        private _initializeFunctions();
        private _initializeVariables();
        private _findModule(type);
        private static _global;
        private static _anonymous;
        private static _modules;
        static global: Module;
        static anonymous: Module;
        static getModule(type: Type): Module;
        private static _isModule(moduleCandidate, moduleName?);
        private static _isType(typeCandidate);
    }
    /**
     A description of the metadata associated with in a class.
     @seealso getType
    */
    class Type {
        private _ctor;
        private _base;
        private _module;
        private _name;
        private _properties;
        private _fields;
        private _methods;
        name: string;
        fullName: string;
        module: Module;
        isPublic: boolean;
        isPrivate: boolean;
        isProtected: boolean;
        isPrimitive: boolean;
        ctor: IFunction;
        prototype: any;
        base: Type;
        constructor(password: number, ctor: IFunction, mod?: Module);
        toString(): string;
        equals(other: any): boolean;
        getHashCode(): number;
        isAssignableTo(other: Type): boolean;
        isAssignableFrom(other: Type): boolean;
        getFieldsOf(instance: any, ...options: Modifier[]): IQueryable<Field>;
        getFieldOf(instance: any, name: string, ...options: Modifier[]): Field;
        getProperties(...options: Modifier[]): IQueryable<Property>;
        getProperty(name: string, ...options: Modifier[]): Property;
        getMethods(...options: Modifier[]): IQueryable<Method>;
        getMethod(name: string, ...options: Modifier[]): Method;
        private _initializeFields(instance);
        private _initializeProperties();
        private _getStaticProperties();
        private _getInstanceProperties();
        private _getProperOptions(optionsList);
        private _isValidProperty(property, modifiers);
        static getType(ctor: IFunction): Type;
    }
    /**
     A description of the metadata associated with in a member of a class.
     @abstract
    */
    class Member {
        private _name;
        private _declaringType;
        private _isStatic;
        name: string;
        declaringType: Type;
        isStatic: boolean;
        constructor(password: number, name: string, declaringType: Type, isStatic: boolean);
        toString(): string;
    }
    /**
     A description of the metadata associated with in a property of a class.
    */
    class Property extends Member {
        private _canWrite;
        private _canRead;
        private _isMethod;
        private _isField;
        private _propertyDescriptor;
        isPublic: boolean;
        isPrivate: boolean;
        isProtected: boolean;
        canWrite: boolean;
        canRead: boolean;
        enumerable: boolean;
        configurable: boolean;
        isMethod: boolean;
        isField: boolean;
        constructor(password: number, name: string, declaringType: Type, propertyDescriptor: PropertyDescriptor, canRead: boolean, canWrite: boolean, isMethod: boolean, isField: boolean, isStatic: boolean);
        getValue(instance: any): any;
        setValue(instance: any, value: any): void;
    }
    /**
     A description of the metadata associated with in a field of a class.
    */
    class Field extends Property {
        isPublic: boolean;
        isPrivate: boolean;
        isProtected: boolean;
        constructor(password: number, name: string, declaringType: Type, isStatic: boolean);
        getValue(instance: any): any;
        setValue(instance: any, value: any): void;
    }
    /**
     A description of the metadata associated with in a variable of a module.
    */
    class Variable extends Property {
        private _module;
        module: Module;
        constructor(password: number, name: string, module: Module);
    }
    /**
     A description of the metadata associated with in a method of a class.
     @remarks
        In JavaScript methods are properties of type function.
        Therefore a Method is a Property.
    */
    class Method extends Property {
        private _underlyingFunction;
        private _parameters;
        constructor(password: number, name: string, declaringType: Type, propertyDescriptor: PropertyDescriptor, canWrite: boolean, underlyingFunction: IFunction, isStatic: boolean);
        invoke(instance: any, ...args: any[]): any;
        getParameters(): IQueryable<Parameter>;
        private _initializeParameters();
    }
    /**
     A description of the metadata associated with in a function of a module.
    */
    class Function extends Method {
        constructor(password: number, name: string, canWrite: boolean, underlyingFunction: IFunction);
    }
    /**
     A description of the metadata associated with in a parameter of a function.
    */
    class Parameter {
        private _name;
        private _position;
        name: string;
        position: number;
        constructor(password: number, name: string, position: number);
        toString(): string;
    }
}
/**
 A sequence of items that can be enumerated one at a time.
 IEnumerables serve to allow common functionality to be defined for
 collections like arrays, sets, dictionaries or more complex data
 structures that have still represent some kind of collection.
 @typeparam [T] The type of item in the sequence.
 @remarks
    An enumeration is not constrainted to be finite but
    it is assumed that they are unless otherwise specified.
*/
interface IEnumerable<T> extends IObject {
    getEnumerator(): IEnumerator<T>;
    forEach(operation: (item?: T) => void): void;
    query(): IQueryable<T>;
    array(): T[];
    count(): number;
}
/**
 Defines an object which performs the enumeration for a particular implementation of IEnumerable.
 @typeparam [T] The type of item which is enumerated.
 @seealso IEnumerable<T>
*/
interface IEnumerator<T> extends IObject {
    current: T;
    moveNext(): boolean;
}
/**
 Defines an sequence with a getter.
 @typeparam [T] The type of item in the collection.
 @remarks
    The get method cannot assumed to be fast though by convention is it implemented to be when possible.
    It is safe to assume that retrieving an object using the get method requires a traversal of the collection.
*/
interface IAccessibleCollection<T> extends IEnumerable<T> {
    get(index: number): T;
}
/**
 Defines a collection that can be used for storing and retrieving objects.
 @typeparam [T] The type of item in the collection.
 @remarks Array<T> implemements ICollection.
 @seealso Array<T>
*/
interface ICollection<T> extends IAccessibleCollection<T> {
    add(item: T): ICollection<T>;
    addRange(items: IEnumerable<T>): ICollection<T>;
    remove(item: T): ICollection<T>;
    removeAt(index: number): ICollection<T>;
    clear(): ICollection<T>;
    set(index: number, item: T): ICollection<T>;
}
/**
 Defines a lazily executed query that performs a computation on a sequence of data.
 @typeparam [T] The type of item being queried.
 @remarks
    Not all methods of IQueryable are lazily executed.
    In particular, methods which don't return IQueryables
    are expected to have executed the query.
*/
interface IQueryable<T> extends IEnumerable<T> {
    forEach(operation: (item: T) => void): IQueryable<T>;
    cast<TElement>(): IQueryable<TElement>;
    where(predicate: (item: T) => boolean): IQueryable<T>;
    select<TSelected>(selector: (item: T) => TSelected): IQueryable<TSelected>;
    selectMany<TSelected>(selector: (item: T) => IEnumerable<TSelected>): IQueryable<TSelected>;
    orderBy<TSelected>(selector: (item: T) => TSelected, comparison?: (first: TSelected, second: TSelected) => number): IQueryable<T>;
    orderByDescending<TSelected>(selector: (item: T) => TSelected, comparison?: (first: TSelected, second: TSelected) => number): IQueryable<T>;
    aggregate<TAccumulate>(accumulator: (first: TAccumulate, second: T) => TAccumulate, seed?: TAccumulate): TAccumulate;
    sum(selector?: (item: T) => number): number;
    max(selector?: (item: T) => number): number;
    min(selector?: (item: T) => number): number;
    first(predicate?: (item: T) => boolean): T;
    firstOrDefault(predicate?: (item: T) => boolean): T;
    last(predicate?: (item: T) => boolean): T;
    lastOrDefault(predicate?: (item: T) => boolean): T;
    single(predicate?: (item: T) => boolean): T;
    singleOrDefault(predicate?: (item: T) => boolean): T;
    skip(count: number): IQueryable<T>;
    take(count: number): IQueryable<T>;
    at(index: number): T;
    concat(other: IEnumerable<T>): IQueryable<T>;
    hasAny(predicate?: (item: T) => boolean): boolean;
    hasNone(predicate?: (item: T) => boolean): boolean;
    distinct(): IQueryable<T>;
    reverse(): IQueryable<T>;
    dictionary<TKey, TValue>(keySelector: (item: T) => TKey, valueSelector: (item: T) => TValue): Classical.Collections.Dictionary<TKey, TValue>;
    execute(): IQueryable<T>;
    result(): T[];
}
/**
 The core JavaScript array.
 @remarks
    Array implements IObject, ICollection<T> and IEnumerable<T>.
    All Objects implement IHashable so arrays can be used as keys in Dictionaries.
 @seealso IObject, ICollection<T> and IEnumerable<T>, IHashable, Classical.Collections.Dictionary
*/
interface Array<T> extends ICollection<T>, IEnumerable<T> {
}
/**
 The core set of collections defined in Classical.
*/
declare module Classical.Collections {
    /**
     An accessible collection that is immutable.
     @typeparam [T] Type parameter of the class
    */
    class ImmutableCollection<T> implements IAccessibleCollection<T> {
        private _get;
        constructor(elements: IEnumerable<T>);
        get(index: number): T;
        getEnumerator(): IEnumerator<T>;
        query(): IQueryable<T>;
        forEach(operation: (item: T) => void): void;
        array(): T[];
        count(): number;
    }
    /**
     Defines a lazily executed query that performs a computation on a sequence of data.
     @typeparam [T] The type of item being queried.
     @remarks
        Not all methods of IQueryable are lazily executed.
        In particular, methods which don't return IQueryables
        are expected to have executed the query.
    */
    class Queryable<T> implements IQueryable<T> {
        _enumerable: IEnumerable<T>;
        constructor(enumerable: IEnumerable<T>);
        toString(): string;
        getEnumerator(): IEnumerator<T>;
        query(): Queryable<T>;
        array(): T[];
        count(): number;
        forEach(operation: (item?: T) => void): void;
        forEach(operation: (item: T) => void): IQueryable<T>;
        cast<TElement>(): IQueryable<TElement>;
        where(predicate: (item: T) => boolean): IQueryable<T>;
        select<TSelected>(selector: (item: T) => TSelected): IQueryable<TSelected>;
        selectMany<TSelected>(selector: (item: T) => IEnumerable<TSelected>): IQueryable<TSelected>;
        orderBy<TSelected>(selector: (item: T) => TSelected, comparison?: (first: TSelected, second: TSelected) => number): IQueryable<T>;
        orderByDescending<TSelected>(selector: (item: T) => TSelected, comparison?: (first: TSelected, second: TSelected) => number): IQueryable<T>;
        aggregate<TAccumulate>(accumulator: (first: TAccumulate, second: T) => TAccumulate, seed?: TAccumulate): TAccumulate;
        sum(selector?: (item: T) => number): number;
        max(selector?: (item: T) => number): number;
        min(selector?: (item: T) => number): number;
        hasNone(predicate?: (item: T) => boolean): boolean;
        hasAny(predicate?: (item: T) => boolean): boolean;
        first(predicate?: (item: T) => boolean): T;
        firstOrDefault(predicate?: (item: T) => boolean): T;
        last(predicate?: (item: T) => boolean): T;
        lastOrDefault(predicate?: (item: T) => boolean): T;
        single(predicate?: (item: T) => boolean): T;
        singleOrDefault(predicate?: (item: T) => boolean): T;
        skip(count: number): IQueryable<T>;
        take(count: number): IQueryable<T>;
        at(index: number): T;
        concat(other: IEnumerable<T>): IQueryable<T>;
        distinct(): IQueryable<T>;
        reverse(): IQueryable<T>;
        dictionary<TKey, TValue>(keySelector: (item: T) => TKey, valueSelector: (item: T) => TValue): Dictionary<TKey, TValue>;
        execute(): IQueryable<T>;
        result(): T[];
        private coalescePredicate(predicate);
    }
    /**
     A collection of utilities for working with objects that implement IEnumerable<T>
     @seealso IEnumerable<T>
    */
    module Enumerable {
        function empty<T>(): IEnumerable<T>;
        function range(end: number): IEnumerable<number>;
        function range(start: number, end: number): IEnumerable<number>;
        function range(start: number, increment: number, end: number): IEnumerable<number>;
        function forEach<T>(items: IEnumerable<T>, operation: (item?: T) => void): void;
    }
}
/**
 Provides methods which extract expressions from JavaScript code.
 @remarks Currently we support extracting the property name from a lambda selector and extracting the arguments from a function.
 @seealso Classical.Reflection
 @example
    import e = Classical.Expression;

    var obj = { property: 'value' };
    e.getProperty(obj, o => o.property); //returns 'property'

    var func = function(a: string, b: string) { return a + b; }
    e.getArguments(func); //['a', 'b']
*/
declare module Classical.Expression {
    function getProperty<TInstance>(instance: TInstance, selector: (instance: TInstance) => any): string;
    function getProperty<TInstance>(selector: (instance: TInstance) => any): string;
    function getArguments(func: Function): string[];
}
/**
 Description of an event which can subscribed to.
 @typeparam [THost] The object which hosts the event.
 @typeparam [TInformation] The information required to respond to the event.
*/
interface IEvent<THost, TInformation> extends IObject {
    subscribe(registration: (host: THost, info: TInformation) => void): void;
    unsubscribe(registration: (host: THost, info: TInformation) => void): void;
    execute(info: TInformation): void;
    clear(): void;
    count(): number;
}
/**
 An event in which subscribers can provide a response through their registration.
 @typeparam [THost] The object which hosts the event.
 @typeparam [TInformation] The information required to respond to the event.
 @typeparam [TResponse] The type of response required from subscribers.
*/
interface IRequest<THost, TInformation, TResponse> extends IObject {
    subscribe(registration: (host: THost, info: TInformation) => TResponse): void;
    unsubscribe(registration: (host: THost, info: TInformation) => TResponse): void;
    execute(info: TInformation): IEnumerable<TResponse>;
    clear(): void;
    count(): number;
}
declare module Classical.Events {
    /**
     Description of an event which can subscribed to.
     @typeparam [THost] The object which hosts the event.
     @typeparam [TInformation] The information required to respond to the event.
    */
    class Event<THost, TInformation> implements IEvent<THost, TInformation> {
        _subscribers: {
            (host: THost, info: TInformation): void;
        }[];
        _host: THost;
        constructor(host: THost);
        subscribe(registration: (host: THost, info: TInformation) => void): void;
        unsubscribe(registration: (host: THost, info: TInformation) => void): void;
        execute(info?: TInformation): void;
        clear(): void;
        count(): number;
    }
    /**
     An event in which subscribers can provide a response through their registration.
     @typeparam [THost] The object which hosts the event.
     @typeparam [TInformation] The information required to respond to the event.
     @typeparam [TResponse] The type of response required from subscribers.
    */
    class Request<THost, TInformation, TResponse> implements IRequest<THost, TInformation, TResponse> {
        _subscribers: {
            (host: THost, info: TInformation): TResponse;
        }[];
        _host: THost;
        constructor(host: THost);
        subscribe(registration: (host: THost, info: TInformation) => TResponse): void;
        unsubscribe(registration: (host: THost, info: TInformation) => TResponse): void;
        execute(info: TInformation): IEnumerable<TResponse>;
        clear(): void;
        count(): number;
    }
    /**
     An request in which subscribers vote with numerical values for the host to tally.
     @typeparam [THost] The object which hosts the event.
     @typeparam [TInformation] The information required to respond to the event.
    */
    class TallyRequest<THost, TInformation> extends Request<THost, TInformation, number> {
        constructor(host: THost);
        tally(info: TInformation): number;
    }
    /**
     An request in which subscribers vote with boolean values for the host to count.
     @typeparam [THost] The object which hosts the event.
     @typeparam [TInformation] The information required to respond to the event.
    */
    class VoteRequest<THost, TInformation> extends Request<THost, TInformation, boolean> {
        _undecidedResult: boolean;
        constructor(host: THost, undecidedResult?: boolean);
        subscribe(registration: (host: THost, info: TInformation) => boolean): void;
        poll(info: TInformation): boolean;
    }
    /**
     A vote request where the result must be unanimous.
     @typeparam [THost] The object which hosts the event.
     @typeparam [TInformation] The information required to respond to the event.
    */
    class UnanimousVoteRequest<THost, TInformation> extends VoteRequest<THost, TInformation> {
        constructor(host: THost, undecidedResult?: boolean);
        poll(info: TInformation): boolean;
    }
}
declare function bind<TModel, TProperty>(model: TModel, selector: (obj: TModel) => TProperty): Classical.Binding.IBinder<Classical.Binding.PropertyUpdate<TProperty>>;
/**
 The objects and interfaces used to create objects that can be bound to each other
 in the sense that when one updates so too does the other.
 @seealso Classical.Binding.Collections
*/
declare module Classical.Binding {
    /**
     Defines an object that can be synchronized with or bound to another object.
     @typeparam [TTargetUpdate] {Update} The type of update consumed by the synchronizable object.
     @remarks
        Every object implementing ISynchronizable is meant to have a Synchronizer associated with it.
     @seealso Classical.Binding.Synchronizer
    */
    interface ISynchronizable<TTargetUpdate extends Update> extends IObject {
        hasTarget(target: ISynchronizable<TTargetUpdate>): boolean;
        hasSource(source: ISynchronizable<any>): boolean;
        bind(binder: IBinder<TTargetUpdate>): void;
        bind(binder: IComplexBinder<TTargetUpdate>): void;
        unbind(source: ISynchronizable<any>): boolean;
        track(registration: (update: TTargetUpdate[], source: any) => void): any;
        apply(updates: IEnumerable<TTargetUpdate>): void;
        detach(): void;
    }
    /**
     An update that can be performed on an ISynchronizable object.
     @remarks
        Updates are converted between types to facilitate binding across types.
        Updates also store their sources so there is an audit trail for objects they have been applied to.
     @seealso Classical.Binding.Synchronizer.
    */
    class Update {
        private _sources;
        constructor(sources: IEnumerable<any>);
        hasSource(source: any): boolean;
        addSource(source: any): void;
        transferSourcesTo<TUpdate extends Update>(update: TUpdate): TUpdate;
    }
    /**
     Defines the manner in which two objects are synchronized.
     @typeparam [TTargetUpdate] {Update} The type of update consumed by a synchronizable object.
    */
    interface IBinder<TTargetUpdate extends Update> extends IObject {
        source: ISynchronizable<Update>;
        converter?: IConverter<any, TTargetUpdate>;
        init?: (target: ISynchronizable<TTargetUpdate>, source: ISynchronizable<Update>) => void;
    }
    /**
     Defines the manner in which one object is synchronized with multiple sources.
     @typeparam [TTargetUpdate] {Update} The type of update consumed by a synchronizable object.
    */
    interface IComplexBinder<TTargetUpdate extends Update> extends IObject {
        sources: ISynchronizable<Update>[];
        converter: IAggregator<any, TTargetUpdate>;
    }
    /**
     Defines an object that converts data between two types.
     @typeparam [TSourceValue] The type of value to convert from.
     @typeparam [TTargetValue] The type of value to convert to.
    */
    interface IConverter<TSourceValue, TTargetValue> extends IObject {
        convert(source: TSourceValue): TTargetValue;
        convertBack?(target: TTargetValue): TSourceValue;
    }
    /**
     Defines an object that aggregates a sequence into a single value.
     @typeparam [TSourceValue] The type of data to aggregate.
     @typeparam [TTargetValue] The type of data returned by the aggregation.
    */
    interface IAggregator<TSourceValue, TTargetValue> extends IObject {
        convert(sources: IEnumerable<TSourceValue>): TTargetValue;
    }
    /**
     A utility class which performs most of the heavy lifting of the binding system.
     @typeparam [TTargetUpdate] {Update} The type of update consumed by the synchronizable object associated with the synchronizer.
     @remarks
        All synchronizable objects are meant to store a reference to a synchronizer.
        They should decorate every method of the synchronizer except apply.
     @seealso Classical.Binding.Synchronizer
    */
    class Synchronizer<TTargetUpdate extends Update> implements ISynchronizable<TTargetUpdate> {
        private _updateDepth;
        private _updates;
        private _target;
        private _binders;
        private _onUpdateEvent;
        target: ISynchronizable<TTargetUpdate>;
        updates: TTargetUpdate[];
        updateDepth: number;
        constructor(target: ISynchronizable<TTargetUpdate>);
        hasTarget(target: ISynchronizable<TTargetUpdate>): boolean;
        hasSource(source: ISynchronizable<any>): boolean;
        bind(binder: IBinder<TTargetUpdate>): void;
        bind(binder: IComplexBinder<TTargetUpdate>): void;
        unbind(source: ISynchronizable<any>): boolean;
        apply(updates: IEnumerable<TTargetUpdate>): void;
        track(registration: (update: TTargetUpdate[], source: any) => void): void;
        detach(): void;
        add(update: TTargetUpdate): void;
        filter(updates: IEnumerable<TTargetUpdate>): TTargetUpdate[];
        sync(immediate?: boolean): boolean;
        syncStart(): void;
        private _createComplexBinding(binder);
        private _executeUpdates(groupUpdate);
        private _executeOnUpdate(updates);
    }
    /**
     A property whose value can be bound to other objects.
     @typeparam [TValue] The type of the property value.
     @remarks
        Properties are not meant to be explicitly added to classes.
        They gain their utility by replacing simple properties on the object
        through the bind method.
     @seealso bind
    */
    class Property<TValue> implements ISynchronizable<PropertyUpdate<TValue>> {
        updating: boolean;
        private _value;
        private _synchronizer;
        value: TValue;
        constructor(value?: TValue);
        toString(): string;
        hasTarget(target: ISynchronizable<PropertyUpdate<TValue>>): boolean;
        hasSource(source: ISynchronizable<any>): boolean;
        bind(source: Property<TValue>): any;
        bind(sources: ISynchronizable<Update>[], selector: (sources: any[]) => TValue): any;
        bind(propertyBinder: IPropertyBinder<TValue>): any;
        bind(binder: IBinder<PropertyUpdate<TValue>>): any;
        bind(binder: IComplexBinder<PropertyUpdate<TValue>>): void;
        unbind(partner: ISynchronizable<any>): boolean;
        track(registration: (update: PropertyUpdate<TValue>[], source: Property<TValue>) => void): void;
        apply(updates: IEnumerable<PropertyUpdate<TValue>>): void;
        detach(): void;
        private _createComplexBinder(sources, selector);
        private _sourceToBinder(source);
    }
    /**
     A property whose value can be bound to other objects. Updates will not be applied until explicitly accepted or reflected.
     @typeparam [TValue] The type of the property value.
     @remarks
        This property is a solution to the problem that arises when an object is bound to a form, and the form is cancelled.
        An object composed of confirmation propreties can have its state accepted or rejected, much like the form.
     @seealso Classical.Binding.Property
    */
    class ConfirmationProperty<TValue> extends Property<TValue> {
        private _newValue;
        private hasAccepted;
        value: TValue;
        newValue: TValue;
        private synchronizer;
        constructor(value?: TValue);
        apply(updates: IEnumerable<PropertyUpdate<TValue>>): void;
        accept(): void;
        reject(): void;
        private _getValue();
        private _setValue(value);
    }
    /**
     Defines the manner in which two binding properties are synchronized.
     @typeparam [TValue] The type of the target property value.
    */
    interface IPropertyBinder<TValue> extends IObject {
        property: Property<any>;
        converter: IConverter<any, TValue>;
    }
    /**
     A specialized update used as a convenience when synchronizing two binding properties.
     The properties can have different value types.
     @typeparam [TValue] The type of the property value.
    */
    class PropertyUpdate<TValue> extends Update {
        value: TValue;
        constructor(value: TValue, sources?: IEnumerable<any>);
    }
    /**
     @internal
    */
    function _getProperty<T>(obj: any, propertyName: string): Property<T>;
    /**
     @internal
    */
    function _setProperty<T>(obj: any, propertyName: string, value: T): void;
    /**
     @internal
    */
    function _propertyBinderToBinder<TValue>(propertyBinder: IPropertyBinder<TValue>): IBinder<PropertyUpdate<TValue>>;
}
/**
 A set of collections which can be bound to each other.
 @seealso Classical.Binding
*/
declare module Classical.Binding.Collections {
    /**
     A collection whose items can be bound and synchronized with other objects.
     @typeparam [T] The type of item in the collection.
    */
    class Collection<T> implements ICollection<T>, ISynchronizable<CollectionUpdate<T>> {
        private _items;
        private _synchronizer;
        constructor(items?: IEnumerable<T>);
        getEnumerator(): IEnumerator<T>;
        forEach(operation: (item?: T) => void): void;
        query(): IQueryable<T>;
        array(): T[];
        count(): number;
        add(item: T): ICollection<T>;
        private _add(update);
        addRange(items: IEnumerable<T>): ICollection<T>;
        remove(item: T): ICollection<T>;
        private _remove(update);
        removeAt(index: number): ICollection<T>;
        private _removeAt(update);
        clear(): ICollection<T>;
        get(index: number): T;
        set(index: number, item: T): ICollection<T>;
        private _set(update);
        hasTarget(target: ISynchronizable<CollectionUpdate<T>>): boolean;
        hasSource(source: ISynchronizable<any>): boolean;
        bind(source: Collection<T>): void;
        bind(collectionBinder: ICollectionBinder<T>): void;
        bind(sources: ISynchronizable<Update>[], selector: (sources: any[]) => any): any;
        bind(binder: IBinder<CollectionUpdate<T>>): void;
        bind(binder: IComplexBinder<CollectionUpdate<T>>): void;
        unbind(source: ISynchronizable<any>): boolean;
        track(registration: (update: CollectionUpdate<T>[], source: any) => void): void;
        apply(updates: IEnumerable<CollectionUpdate<T>>): void;
        detach(): void;
        toString(): string;
        private _createComplexBinder(sources, selector);
        private _sourceToBinder(source);
        private _collectionBinderToBinder(collectionBinder);
        private _applyAdd(updates);
        private _applySet(updates);
        private _applyRemove(updates);
        private _applyRemoveAt(updates);
    }
    /**
     Defines the manner in which two binding collections are synchronized.
     @typeparam [T] The type of item in the target collection.
    */
    interface ICollectionBinder<T> extends IObject {
        collection: Collection<any>;
        converter?: IConverter<any, T>;
    }
    /**
     A specialized update used as a convenience when synchronizing two binding collections.
     @typeparam [TValue] The type of the property value.
    */
    class CollectionUpdate<T> extends Update {
        type: CollectionUpdateType;
        oldValue: T;
        newValue: T;
        index: number;
        constructor(sources?: IEnumerable<any>);
        create(type: CollectionUpdateType, oldValue: T, newValue: T, index: number): CollectionUpdate<T>;
    }
    enum CollectionUpdateType {
        Add = 0,
        Set = 1,
        Remove = 2,
        RemoveAt = 3,
    }
}
