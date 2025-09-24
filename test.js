import PropTypes from 'prop-types';

/* ComponentA */
const ComponentAPropsTypes = {
    componentAProps1: PropTypes.string,
    componentAProps2: PropTypes.string,
    componentAProps3: PropTypes.string,
    componentAProps4: PropTypes.number,
    componentAProps5: PropTypes.bool,
}
const ComponentA = ({ componentAProps1, componentAProps2, componentAProps3, componentAProps4, componentAProps5 }) => {
    return (
        <div>
            <p>{componentAProps1}</p>
            <p>{componentAProps2}</p>
            <p>{componentAProps3}</p>
            <p>{componentAProps4}</p>
            <p>{componentAProps5}</p>
        </div>
    );
};
ComponentA.propTypes = ComponentAPropsTypes;

/* ComponentB */
// Similar structure as ComponentA

/* ComponentC */
// Similar structure as ComponentA

/* Parent Component */
const Parent = (props) => {
    const componentAProps = extractComponentProps(props, ComponentAPropTypes);
    const componentBProps = extractComponentProps(props, ComponentBPropTypes);
    const componentCProps = extractComponentProps(props, ComponentCPropTypes);

    return (
        <>
            <ComponentA {...componentAProps} />
            <ComponentB {...componentBProps} />
            <ComponentC {...componentCProps} />
        </>
    );
};

export default Parent;