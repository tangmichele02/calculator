import './History.css';

const History = (props) => {

    return <div className="history">{props.history.map((result) => <h3 className="hist-item">{result}</h3>)}</div>;
};

export default History;