

def main(cmd):
	print 'runcmd:', cmd
	try:
		exec(cmd)
	except:
		import traceback
		traceback.print_exc()
	print 'aa<a>  - -    -- exit --'+(' '*100)+'123'+(' '*1000)+'hah'

