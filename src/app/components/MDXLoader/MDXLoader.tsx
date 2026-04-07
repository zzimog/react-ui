import { useState, type PropsWithChildren } from 'react';
import * as Icons from 'lucide-react';
import type { MDXComponents, MDXContent } from 'mdx/types';
import { NavLink } from 'react-router';
import { Card, cn, Code, CodeBlock, createScopedContext, Table } from '@ui';
import * as UIComponents from '@ui';
import { createMDXElement } from './create-mdx-element';

const DISPLAY_NAME = 'MDXLoader';

type MDXContextValue = {
  baseId?: string;
  onBaseIdChange(baseId: string): void;
};

const [MDXContext, useMDXContext] = createScopedContext<
  MDXContextValue | undefined
>('MDXProvider', undefined);

/*---------------------------------------------------------------------------*/

type MDXLoaderProps = {
  mdx: MDXContent;
  components?: MDXComponents;
};

export const MDXLoader = ({ mdx: Mdx, components }: MDXLoaderProps) => {
  const [baseId, setBaseId] = useState<string | undefined>();

  return (
    <MDXContext baseId={baseId} onBaseIdChange={setBaseId}>
      <Mdx
        components={{
          h1: createMDXElement('h1', 'mb-8 text-4xl/none font-bold'),
          h2: createMDXElement('h2', 'mt-16 mb-6 text-xl/none font-semibold'),
          h3: createMDXElement('h3', 'mt-12 mb-6 text-lg/none font-semibold'),
          a: ({ className, ...props }) => (
            <NavLink {...props} className={cn('underline', className)} />
          ),
          p: ({ className, ...props }) => (
            <p
              {...props}
              className={cn('text-muted my-6 leading-relaxed', className)}
            />
          ),
          code: (props) =>
            !props.className ? <Code {...props} /> : <code {...props} />,
          pre: (props) => (
            <Card className="p-0" asChild>
              <CodeBlock {...props} />
            </Card>
          ),
          blockquote: ({ className, ...props }) => (
            <blockquote
              {...props}
              className={cn(
                'my-4',
                'px-4',
                'border-l-4',
                'border-muted',
                'italic',
                'text-muted',
                'bg-muted-background',
                'transition',
                className
              )}
            />
          ),
          hr: ({ className, ...props }) => (
            <hr {...props} className={cn('my-16', className)} />
          ),
          Demo: (props) => (
            <Card
              className={cn(
                '[&+.border]:border-t-0',
                '[&+.rounded-shape]:rounded-t-none',
                'has-[+.rounded-shape]:rounded-b-none'
              )}
            >
              <Card.Content {...props} />
            </Card>
          ),
          PropsTable: (props: { data: Record<string, string>[] }) => (
            <Card className="p-0">
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.Head>Prop</Table.Head>
                    <Table.Head>Type</Table.Head>
                    <Table.Head>Default</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="font-mono">
                  {props.data.map((row, i) => (
                    <Table.Row key={i} className="hover:bg-transparent">
                      <Table.Cell>
                        <Code className="text-primary-contrast bg-primary/75">
                          {row.name}
                        </Code>
                      </Table.Cell>
                      <Table.Cell>
                        <Code>{row.type}</Code>
                      </Table.Cell>
                      <Table.Cell>
                        {row.default ?? <i className="text-muted">—</i>}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
          ),
          Detail: (props: PropsWithChildren<{ present?: boolean }>) => {
            const [present, setPresent] = useState(props.present ?? true);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const children = (props.children as any)?.(present);

            return (
              <div>
                <UIComponents.Button onClick={() => setPresent(!present)}>
                  Toggle children
                </UIComponents.Button>
                {children}
              </div>
            );
          },
          ...(Icons as object),
          ...(UIComponents as object),
          ...components,
        }}
      />
    </MDXContext>
  );
};

MDXLoader.displayName = DISPLAY_NAME;
MDXLoader.useContext = useMDXContext;
