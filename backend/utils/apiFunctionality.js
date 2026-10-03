
class APIFunctionality {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keyword) {
            const keyword = this.queryStr.keyword;

            this.query = this.query.find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { category: { $regex: keyword, $options: "i" } }
                ]
            });
        }
        return this;
    }

    
    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        // Make category filter case-insensitive
        if (queryCopy.category) {
            queryCopy.category = {
                $regex: `^${queryCopy.category}$`,
                $options: "i"
            };
        }

        this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default APIFunctionality;
