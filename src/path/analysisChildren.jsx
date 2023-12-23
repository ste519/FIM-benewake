import { fetchAnalysisData } from "../api/analysis";
import Analysis from "../routes/Analysis";
import analysisSchema from "../constants/schemas/analysisSchema";

const analysisChildren = Object.keys(analysisSchema).map(
    (key) => {
        const item = analysisSchema[key]
        return {
            name: item.cn,
            path: key,
            element: <Analysis schema={item} />,
            type: "analysis",
        }
    }
)

export default analysisChildren;
