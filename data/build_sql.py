# -*- coding:utf-8 -*-
import os
import codecs
import re

area = 'data/hwasung'

def to_ansi(str):
	udata = str.decode("utf-8")
	return udata.encode("ascii","ignore")
	
def to_utf8(str):
	return unicode(str, 'euc-kr').encode('utf-8')
	
def whatisthis(s):
	if isinstance(s, str):
		print "ordinary string"
	elif isinstance(s, unicode):
		print "unicode string"
	else:
		print "not a string"		
		
def classify_type(category):
	if re.search(unicode('������', 'euc-kr'), category, re.UNICODE) <> None:
		return unicode('������', 'euc-kr')
	elif re.search(unicode('�ΰ�', 'euc-kr'), category, re.UNICODE) <> None:
		return unicode('�ΰ�', 'euc-kr')
	elif re.search(unicode('����', 'euc-kr'), category, re.UNICODE) <> None:
		return unicode('����', 'euc-kr')
	else:
		return unicode('��Ÿ', 'euc-kr')
		
def classify_auth(category):
	if re.search(unicode('�������', 'euc-kr'), category, re.UNICODE) <> None:
		return unicode('�������', 'euc-kr')
	elif re.search(unicode('�Ϲ�����', 'euc-kr'), category, re.UNICODE) <> None:
		return unicode('�Ϲ�����', 'euc-kr')
	else:
		return unicode('������', 'euc-kr')

def escape_badchar(str):
	result = str
	result = result.replace('"', '')
	result = result.replace("'", "")
	return result
	
def get_type_and_auth(category):
	type = classify_type(category)
	auth = classify_auth(category)
	return type, auth

f = open('%s/final_list.txt'%(area), 'r')
fw = codecs.open('%s/bulk_insert.txt'%(area), 'w', 'utf-8')
for line in f:
	items = line.split(';')
	lng = items[3]
	if len(items[3]) == 0:
		lng = '0'
		
	lat = items[4]
	if len(items[4]) == 0:
		lat = '0'
		
	area1 = unicode('��⵵', 'euc-kr')
	area2 = unicode('ȭ����', 'euc-kr')

	title = escape_badchar(items[1])
	
	uid = items[0].decode("utf-8")
	utitle = title.decode("utf-8")
	uaddress = items[2].decode("utf-8")
	ulng = lng.decode("utf-8")
	ulat = lat.decode("utf-8")
	
	uphone = items[5].decode("utf-8")
	ucategory = items[6].decode("utf-8").strip()
	
	utype, uauth = get_type_and_auth(ucategory)
	
	sql = "insert into nursery(id, title, address, lat, lng, phone, category, area1, area2, type, auth) values('%s','%s','%s',%s,%s,'%s','%s','%s','%s','%s','%s');\n"%(uid, utitle, uaddress, ulng, ulat, uphone, ucategory, area1, area2, utype, uauth )	
	
	fw.write(sql)
	
fw.close()
f.close()
