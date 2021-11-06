import React from 'react';
import PropTypes from 'utils/propTypes';

import { Card, CardImg, CardImgOverlay, CardTitle, CardText } from 'reactstrap';

import Todos, { propTypes as TodosPropTypes } from 'components/Todos';

import backgroundImage from 'assets/img/bg/background_1920-2.jpg';

const TodosCard = ({ image, title, subtitle, todos, ...restProps }) => {
  return (
    <Card {...restProps}>
      <div className="position-relative">
          <CardTitle className="text-white">{title}</CardTitle>
          <CardText className="text-white">{subtitle}</CardText>
      </div>
      <Todos todos={todos} />
    </Card>
  );
};



TodosCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  todos: TodosPropTypes.todos,
};

// TodosCard.defaultProps = {
//   title: 'To-do List',
//   subtitle: 'Due soon...',
// };

export default TodosCard;
