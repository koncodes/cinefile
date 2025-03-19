import { AbsoluteCenter, ProgressCircle } from '@chakra-ui/react';

interface Props {
    score: number;
}

const Rating = ({score }: Props) => {
    let color = score > 7.5 ? 'green' : score > 6.0 ? 'yellow' : '';
  return (
    <ProgressCircle.Root size="lg" value={score * 10} width="min-content">
        <ProgressCircle.Circle css={{ "--thickness": "4px" }}>
            <ProgressCircle.Track />
            <ProgressCircle.Range strokeLinecap="round" stroke={color}/>
        </ProgressCircle.Circle>
        <AbsoluteCenter>
            <ProgressCircle.ValueText />
        </AbsoluteCenter>
    </ProgressCircle.Root>
  )
}

export default Rating