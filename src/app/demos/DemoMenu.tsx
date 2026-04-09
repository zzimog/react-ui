import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Copy,
  File,
  FileSymlink,
  Folder,
  PencilLine,
  Scissors,
  Text,
  Trash,
} from 'lucide-react';
import { Button, Menu } from '@ui';

const DemoMenu = () => {
  const [size, setSize] = useState('md');
  const [arrange, setArrange] = useState(false);
  const [align, setAlign] = useState(true);
  const [showIcons, setShowIcons] = useState(true);

  return (
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
};

export const DemoMenuDropdown = () => (
  <Menu>
    <Menu.Trigger asChild className="mx-auto">
      <Button className="aria-expanded:[&>svg]:rotate-180">
        Dropdown
        <ChevronDown className="transition" />
      </Button>
    </Menu.Trigger>
    <DemoMenu />
  </Menu>
);

export const DemoMenuContext = () => (
  <Menu>
    <Menu.ContextArea className="rounded-shape mx-auto w-fit cursor-default border-2 border-dashed border-current p-4 select-none">
      Right-click here!
    </Menu.ContextArea>
    <DemoMenu />
  </Menu>
);
