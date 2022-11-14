import {Colors} from '@app/resources';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  headerContentContainer: {
    width: 0,
  },

  listContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },

  headerImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    marginTop: 16,
  },

  webViewWrapper: {
    flex: 1,
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  webViewContainer: {},

  loadingContainer: {
    bottom: undefined,
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    marginBottom: 15,
  },

  createAtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  createAtIcon: {
    marginRight: 5,
  },
  createAt: {
    color: Colors.GRAY,
    fontSize: 10,
  },
});
