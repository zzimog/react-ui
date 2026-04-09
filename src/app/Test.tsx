import { useState } from 'react';
import {
  Card,
  Field,
  Input,
  Label,
  Password,
  RadioGroup,
  Slider,
  Switch,
  Title,
} from '@ui';
import { DemoMenuContext, DemoMenuDropdown } from './demos';

export const TestPage = () => {
  const [sliderValue, setSliderValue] = useState(12);

  return (
    <div className="flex flex-col gap-8">
      <Title>Test page</Title>

      <DemoMenuDropdown />
      <DemoMenuContext />

      <Field.Set className="mx-auto w-xs max-w-full">
        <Field.Legend>Theme</Field.Legend>
        <RadioGroup defaultValue="dark">
          <Label>
            <RadioGroup.Item id="r1" value="light" />
            Light
          </Label>
          <Label>
            <RadioGroup.Item id="r2" value="dark" />
            Dark
          </Label>
          <Label>
            <RadioGroup.Item id="r3" value="system" />
            System
          </Label>
        </RadioGroup>
      </Field.Set>

      <Card>
        <Card.Content>
          <Field>
            <Field.Label>Password</Field.Label>
            <Password>
              {/** Input group */}
              <Input.Group>
                {/** Field control */}
                <Field.Control>
                  <Password.Input id="demo-password" />
                </Field.Control>

                {/** Password toggle */}
                <Password.Toggle as={Input.Addon} />
              </Input.Group>

              {/** Requirements */}
              <Password.Requirement pattern={/[a-z]/}>
                One lowercase character
              </Password.Requirement>
              <Password.Requirement pattern={/[A-Z]/}>
                One uppercase character
              </Password.Requirement>
              <Password.Requirement pattern={/[0-9]/}>
                One number
              </Password.Requirement>
              <Password.Requirement pattern={/[!?@#]/}>
                One special character (!?@#)
              </Password.Requirement>
            </Password>
          </Field>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content className="flex justify-center gap-2">
          <Switch />
          <Switch defaultChecked />
          <Switch disabled />
          <Switch disabled defaultChecked />
        </Card.Content>

        <Card.Content className="flex items-center justify-center gap-8">
          <Slider
            min={10}
            max={20}
            step={1}
            value={sliderValue}
            className="w-full max-w-60"
            onValueChange={setSliderValue}
          >
            <Slider.Track>
              <Slider.Steps />
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>

          <Slider
            min={10}
            max={20}
            step={1}
            direction="vertical"
            value={sliderValue}
            className="min-h-40"
            onValueChange={setSliderValue}
          >
            <Slider.Track>
              <Slider.Steps />
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Card.Content>
      </Card>
    </div>
  );
};
