import children from "../path/children";

export const fetchPrev = async ({ selectedQuery }) => {
    const res = await fetchData(selectedQuery)
    return res
}

export const getTableId = (location) => {
    return children.find(route => route.path === location.pathname.replace("/", ""))?.id
}