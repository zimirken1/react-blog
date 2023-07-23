import {useMemo} from "react";

// export const usePagesCount = (totalPages, limit) => {
//     let pagesCount = Math.ceil(totalPages / limit);
//     return pagesCount;
// }

export const usePagination = (pagesCount) => {
    let pagesArray = useMemo(() => {
        let result = [];
        for (let i = 0; i < pagesCount; i++) {
            result.push(i + 1);
        }
        return result;
    }, [pagesCount])

    return pagesArray;
};
