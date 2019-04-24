import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import FIELDS from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

	const reviewFields = _.map(FIELDS, ({ name, label }) => {
		return (
			<div key={ name }>
				<label>{ label }</label>
				<div>{ formValues[name] }</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button onClick={ onCancel }
				className="yellow darken-3 btn-flat white-text" >
				Back
			</button>
			<button onClick={ () => submitSurvey(formValues, history) }
				className="green btn-flat white-text right">
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
}

function mapStatetoProps(state) {
	//console.log(state);
	return {
		formValues: state.form.surveyForm.values
	}
}

export default connect(mapStatetoProps, actions)(withRouter(SurveyFormReview));