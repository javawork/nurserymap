# -*- coding:utf-8 -*-

import os

for i in range(0, 200):
	filename = 'data/hwasung/result%d.html'%(i)
	command = 'curl -d "programId=P0001PG00001307&flag=NSSlPL&offset=%d&ctprvn=41000&signgu=41590" "http://m.childcare.go.kr/nursery/mAllNurserySlPL.jsp" > %s'%(i*10, filename)
	os.system(command)
	print 'Done ', i
	if -1 == open(filename, 'r').read().find('javascript:goDetailPage'):
		print 'break ', i
		break
	
	
