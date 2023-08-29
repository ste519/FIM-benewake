import Bar1 from '../charts/bar1';
import Bar2 from '../charts/bar2';
import Bar3 from '../charts/bar3';
import Line1 from '../charts/line1';
import Pie1 from '../charts/pie1';
import Area1 from '../charts/area1';
import DataPoint from '../charts/data-point';

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