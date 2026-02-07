// class APIFunctionality{
//     constructor(query, queryStr){
//         this.query=query,
//         this.queryStr=queryStr
//     }
//     search(){
//         const keyword=this.queryStr.keyword?{
//         name:{
//                 $regex: this.queryStr.keyword,
//                 $options:"i"
//             }
//         }:{};        
//         this.query=this.query.find({...keyword});
//         return this;
//     }
//     filter()
//     {
//         const queryCopy = {...this.queryStr}; 
//         const removeFields=["keyword","page", "limit"];
//         removeFields.forEach(key=>delete queryCopy[key])
//         this.query = this.query.find(queryCopy);
//         return this;
//     } 
//     pagination(resultPerPage)
//     {
//         const currentPage = Number(this.queryStr.page) || 1
//         const skip = resultPerPage*(currentPage-1);
//         this.query=this.query.limit(resultPerPage).skip(skip)
//         return this
//     }
// }

// export default APIFunctionality;



class APIFunctionality {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // 🔍 Smart Search (name OR category, case-insensitive)
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

    // 🧠 Smart Filter (category, case-insensitive)
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

    // 📄 Pagination (unchanged)
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default APIFunctionality;
