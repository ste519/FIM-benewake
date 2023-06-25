import Bar1 from '../components/bar1';
import Bar2 from '../components/bar2';
import Bar3 from '../components/bar3';
import Line1 from '../components/line1';
import Pie1 from '../components/pie1';
import Area1 from '../components/area1';
import DataPoint from '../components/data-point';

export default function Charts() {
    return (
        <>
            <div className="container data-module">
                <Bar1 />
                <Bar2 />
                <Bar3 />
                <DataPoint description="订单及时交付率" value="98.6%" />
                <DataPoint description="订单及时交付率" value="98.6%" />
                <Line1 />
                <Pie1 />
                <Area1 />
            </div>
        </>
    );
}