import { useEffect } from 'react'
import { Container, Grid, Table } from 'semantic-ui-react'
import { hexToString } from '@polkadot/util'

import { useVotechainContext } from './VotechainContext'

// Blocks component, tela responsavel por mostrar as informações dos blocos da blockchain
const Blocks = () => {
  const { blocks, fetchBlocks } = useVotechainContext()

  useEffect(() => {
    fetchBlocks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Container>
        <h3>Blocks</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width="16">
              {blocks &&
                blocks.map((block, i) => {
                  return <Block key={i} block={block} />
                })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  )
}

// Block component, responsavel por apresentar a informação de um bloco da blockchain
const Block = ({ block }) => {
  return (
    <Table celled compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Key</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(block).map((key, i) => {
          return (
            <Table.Row key={i}>
              <Table.Cell>
                <b>{key}</b>
              </Table.Cell>
              <Table.Cell>
                {typeof block[key] !== 'object'
                  ? block[key]
                  : Object.keys(block[key]).map((arg, j) => {
                      try {
                        return (
                          <div key={j}>
                            <b>{arg}:</b>{' '}
                            {arg === 'description'
                              ? hexToString(block[key][arg])
                              : block[key][arg]}
                          </div>
                        )
                      } catch (error) {
                        return (
                          <div key={j}>
                            <b>{arg}:</b> {block[key][arg]}
                          </div>
                        )
                      }
                    })}
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default Blocks
