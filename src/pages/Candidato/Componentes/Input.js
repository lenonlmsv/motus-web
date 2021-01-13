import React from "react";
import InputMask from "react-input-mask";

export const InputPhoneNumber = (props) => (
	<InputMask
		id="phone-number"
		mask="(99) 99999-9999"
		value={props.value}
		onChange={props.onChange}
		placeholder="(00) 00000-0000"
		title="Somente números"
		pattern="[0-9() \\-]+"
		minLength="11"
		disabled={props.disabled}
	/>
);

export const InputPhone = (props) => (
	<InputMask
		id="phone"
		mask="(99) 9999-9999"
		value={props.value}
		onChange={props.onChange}
		placeholder="(00) 00000-0000"
		title="Somente números"
		pattern="[0-9() \\-]+"
		minLength="10"
		required
	/>
);
