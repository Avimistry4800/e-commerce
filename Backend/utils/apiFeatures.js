class ApiFeatures {
    constructor (query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search () {
        const keyword=this.queryStr.keyword ? {
            $regex: this.queryStr.keyword,
            $options: 'i',
        } : {};


        this.query = this.query.find({
            ...keyword
        });
        return this;
    }

    filter() {

        const queryCopy  = {...this.queryStr}

        // Remove some fields from category
        const removeFields = ['page', 'limit',  'keyword'];
        removeFields.forEach(key => delete queryCopy[key]);

        // Filter for Price and Rating
        // const quaryStr

        this.query = this.query.find(queryCopy);	
        return this;

    }
}

module.exports = ApiFeatures;
