const analysisDefs = [
    {
        id: "serialNum",
        header: '序号',
        accessorKey: 'serialNum',
        size: 50
    },
    {
        id: "itemCode",
        header: '物料编码',
        accessorKey: 'itemCode',
        size: 150
    },
    {
        id: "itemName",
        header: '物料名称',
        accessorKey: 'itemName',
        size: 290
    },
    {
        id: "salesmanName",
        header: '销售员',
        accessorKey: 'salesmanName',
        size: 100
    },
    {
        id: "salesmanSaleNum",
        header: '销售员产品销售总额',
        accessorKey: 'salesmanSaleNum',
        size: 140
    },
    {
        id: "itemSaleNum",
        header: '产品销售总额',
        accessorKey: 'itemSaleNum',
        size: 100
    },
    {
        id: "salesShare",
        header: '销售占额',
        accessorKey: 'salesShare',
        size: 90
    },
    {
        id: "monthAvg",
        header: '产品月平均',
        accessorKey: 'monthAvg',
        size: 80
    }
];


export default analysisDefs;