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
        const queryCopy = {...this.queryStr};

        // Remove some fields from category
        const removeFields = ['page', 'limit',  'keyword'];
        removeFields.forEach(key => delete queryCopy[key]);

        // Filter for Price and Rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));	
        return this;

    }

    pagination(reasultPerPage) {
        const currentPage = Number(this.queryStr.page)  || 1;

        const skip = (currentPage - 1) * reasultPerPage;

        this.query = this.query.limit(reasultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;
