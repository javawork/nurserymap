import os
import urllib
from bs4 import BeautifulSoup

area = 'data/hwasung'

def to_ansi(str):
	udata = str.decode("utf-8")
	return udata.encode("ascii","ignore")

def make_list(id, title, address, phone, lng, lat, category):
	print id, title, address, lng, lat, phone, category
	fw = open('%s/final_list.txt'%(area), 'a')
	lng = to_ansi(lng)
	lat = to_ansi(lat)
	fw.write('%s;%s;%s;%s;%s;%s;%s\n'%(id, title.strip(), address, lat, lng, phone.strip(), category.strip()))
	#fw.write('%s;%s;\n'%(lng, lat))
	fw.close()
	
def parse_xml(filename):
	f11 = open(filename, 'r')
	xml_str = f11.read()
	f11.close()

	soup = BeautifulSoup(xml_str)
	if soup.lng == None or soup.lat == None:
		return '', ''
		
	return soup.lng.string, soup.lat.string
	
def whatisthis(s):
	if isinstance(s, str):
		print "ordinary string"
	elif isinstance(s, unicode):
		print "unicode string"
	else:
		print "not a string"		

def convert_address(address):
	encoded_addr = urllib.quote(address)
	url = 'http://apis.daum.net/local/geo/addr2coord?apikey=DAUM_API_KEY&q=%s&output=xml'%(encoded_addr)
	output_filename = 'lng_output.xml'
	os.system('DEL %s'%(output_filename))
	os.system('curl.exe "%s" > %s'%(url, output_filename))
	
	#print xml_str
	return parse_xml(output_filename)

f = open('%s/list.txt'%(area), 'r')
for line in f:
	#print line
	items = line.split(';')
	address = items[2]
	lng, lat = convert_address( address )
	make_list(items[0], items[1], items[2], items[3], lng, lat, items[4])
	
f.close()
