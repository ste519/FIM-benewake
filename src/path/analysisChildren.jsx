import { fetchAnalysisData } from "../api/analysis";
import Analysis from "../routes/Analysis";

const analysisChildren = [
    {
        name: "销售员销售现况表",
        path: "allPastAnalysis",
        element: <Analysis />,
        type: "analysis",
        loader: async () => {
            try {
                const res = await fetchAnalysisData('getAllPastAnalysis')
                return res
            }
            catch (err) {
                console.log(err);
            }
        }
    }
]

export default analysisChildren;
