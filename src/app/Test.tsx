import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  File,
  FileSymlink,
  Folder,
  PencilLine,
  Scissors,
  Text,
  Trash,
} from 'lucide-react';
import {
  Card,
  Field,
  Input,
  Label,
  Menu,
  Password,
  RadioGroup,
  Slider,
  Switch,
  Title,
} from '@ui';

export const TestPage = () => {
  const [size, setSize] = useState('md');
  const [arrange, setArrange] = useState(false);
  const [align, setAlign] = useState(true);
  const [showIcons, setShowIcons] = useState(true);
  const [sliderValue, setSliderValue] = useState(12);

  const DemoMenu = (
    <Menu.Content className="w-64">
      <Menu.Item>
        <Menu.Icon as={ArrowLeft} />
        Previous
      </Menu.Item>
      <Menu.Item>
        <Menu.Icon as={ArrowRight} />
        Next
      </Menu.Item>
      <Menu.Separator />
      <Menu.RadioGroup value={size} onValueChange={setSize}>
        <Menu.Label>Icon size</Menu.Label>
        <Menu.RadioItem value="sm">Small</Menu.RadioItem>
        <Menu.RadioItem value="md">Medium</Menu.RadioItem>
        <Menu.RadioItem value="lg">Large</Menu.RadioItem>
      </Menu.RadioGroup>
      <Menu.Separator />
      <Menu.CheckboxItem checked={arrange} onCheckedChange={setArrange}>
        Auto arrange icons
      </Menu.CheckboxItem>
      <Menu.CheckboxItem checked={align} onCheckedChange={setAlign}>
        Align icons to grid
      </Menu.CheckboxItem>
      <Menu.Separator />
      <Menu.CheckboxItem checked={showIcons} onCheckedChange={setShowIcons}>
        Show icons
      </Menu.CheckboxItem>
      <Menu.Separator />
      <Menu.Sub>
        <Menu.SubTrigger>More options</Menu.SubTrigger>
        <Menu.SubContent>
          <Menu.Sub>
            <Menu.SubTrigger>New</Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item>
                File
                <Menu.Icon as={File} />
              </Menu.Item>
              <Menu.Item>
                Folder
                <Menu.Icon as={Folder} />
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item>
                Shortcut
                <Menu.Icon as={FileSymlink} />
              </Menu.Item>
              <Menu.Item>
                Text document
                <Menu.Icon as={Text} />
              </Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>
          <Menu.Separator />
          <Menu.Item>
            <Menu.Icon as={Scissors} />
            Cut
          </Menu.Item>
          <Menu.Item onClick={() => console.log('copy action')}>
            <Menu.Icon as={Copy} />
            Copy
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item disabled>
            <Menu.Icon as={Trash} />
            Delete
          </Menu.Item>
          <Menu.Item>
            <Menu.Icon as={PencilLine} />
            Rename
          </Menu.Item>
        </Menu.SubContent>
      </Menu.Sub>
    </Menu.Content>
  );

  return (
    <div className="flex flex-col gap-8">
      <Title>Test page</Title>

      <Menu>
        <Menu.Trigger className="mx-auto w-fit border p-2">
          Click here...
        </Menu.Trigger>
        {DemoMenu}
      </Menu>

      <Menu>
        <Menu.ContextArea className="rounded-shape mx-auto w-fit border-2 border-dashed border-current p-4">
          ...or right-click here!
        </Menu.ContextArea>
        {DemoMenu}
      </Menu>

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
