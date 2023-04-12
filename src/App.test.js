import { fireEvent, render, screen } from '@testing-library/react';
import { FeedbackForm } from './feedbackform';

describe("Feedback Form", () => {
  test("Submission is disabled if score < 5 && comment.length < 10", () => {
    const handleSubmit = jest.fn(); // Mock function.
    render(<FeedbackForm onSubmit={handleSubmit} />); // Mock function passed in onSubmit event.

    const rangeInput = screen.getByLabelText(/Score:/); // Ask the root to find a label with text score.
    fireEvent.change(rangeInput, { target: { value: 4 } }); //Fill the found element with value 4.

    const submitButton = screen.getByRole("button"); //Locate button element
    fireEvent.click(submitButton);  //Trigger the event

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(submitButton).toHaveAttribute("disabled");
  })
  test("User is able to submit the form if the score is lower than 5 and additional feedback is provided", () => {
    const score = "3";
    const comment = "The pizza crust was too thick";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass

    const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, { target: { value: score } });

    const textArea = screen.getByLabelText(/Comments:/);
    fireEvent.change(textArea, { target: { value: comment } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment,
    });
  });

  test("User is able to submit the form if the score is higher than 5, without additional feedback", () => {
    const score = "9";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, {
      target: { value: score },
    });

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment: "",
    });
  });
})
