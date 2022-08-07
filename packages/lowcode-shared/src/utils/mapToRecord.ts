export default function mapToRecord<K extends PropertyKey, V>(map: Map<K, V>) {
  return Object.fromEntries<V>(map.entries());
}
