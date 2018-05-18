import React, { PureComponent } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import './react_dates_overrides.css'

class RecuritDuring extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            start: null,
            end: null,
            focusedInput: null
        }

    }

    render() {
        return (
            <div>

                <DateRangePicker
                    style={{height: "30px"}}
                    startDate={this.props.startDate} // momentPropTypes.momentObj or null,
                    startDatePlaceholderText="모집 시작"
                    endDatePlaceholderText="모집 마감"
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.props.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.props.onChange({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </div>
        );
    }
}

export default RecuritDuring