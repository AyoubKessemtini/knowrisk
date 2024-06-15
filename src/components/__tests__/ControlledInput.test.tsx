import { ControlledInput } from '@components/ControlledInput';
import { TestIDs } from '@constants/TestIDs';
import { zodResolver } from '@hookform/resolvers/zod';
import { store } from '@store/index';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native';
import { Provider } from 'react-redux';
import { z } from 'zod';

const mockSchema = z.object({
  testInputValue: z.string().min(1),
});

function MockFormComponent() {
  const { control, handleSubmit } = useForm<{ testInputValue: string }>({
    defaultValues: {
      testInputValue: '',
    },
    resolver: zodResolver(mockSchema),
  });

  return (
    <Provider store={store}>
      <ControlledInput
        name="testInputValue"
        control={control}
        placeholderText="test"
        bottomText="test"
      />
      <Button
        title="Submit"
        testID="submitButton"
        onPress={handleSubmit(jest.fn())}
      />
    </Provider>
  );
}

describe('[COMPONENTS]: ControlledInput', () => {
  it('should render correctly and respond to user input', async () => {
    const returnValue = 'mocked return value';

    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <MockFormComponent />,
    );

    const input = getByPlaceholderText('test');
    fireEvent.changeText(input, returnValue);

    const button = getByTestId('submitButton');
    const errorText = queryByTestId(TestIDs.tests.CTextInputBottomText);

    await act(async () => {
      fireEvent.press(button);
    });

    expect(errorText).not.toBeTruthy();
  });

  it('should render with bottom text error if iput is invalid', async () => {
    const { getByTestId, queryByTestId } = render(<MockFormComponent />);

    const button = getByTestId('submitButton');

    await act(async () => {
      fireEvent.press(button);
    });
    const errorText = queryByTestId(TestIDs.tests.CTextInputBottomText);

    expect(errorText).toBeTruthy();
  });
});
