class FactoryThing {
    constructor() {
        this.dictClass = {};
        this.init();
    }

    add(_id, entityClass) {
        this.dictClass[_id] = entityClass;
    }

    getModal(_id) {
        return this.dictClass[_id];
    }

    getEntity(element) {
        var m = this.dictClass[element[0]]
        return new m(element);
    }

    getList() {
        return this.dictClass;
    }

    init() {
        this.add(0, ThingGround);
    }
};